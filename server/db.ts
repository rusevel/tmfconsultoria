import { and, desc, eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { BlogPost, InsertBlogPost, InsertUser, blogPosts, newsletterDeliveries, newsletterSubscribers, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function listPublishedBlogPosts() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(blogPosts).where(eq(blogPosts.status, "published")).orderBy(desc(blogPosts.publishedAt));
}

export async function getPublishedBlogPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(blogPosts).where(and(eq(blogPosts.slug, slug), eq(blogPosts.status, "published"))).limit(1);
  return result[0];
}

export async function listBlogPostsForAdmin() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(blogPosts).orderBy(desc(blogPosts.updatedAt));
}

export async function getBlogPostById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
  return result[0];
}

export async function createBlogPost(input: InsertBlogPost) {
  const db = await getDb();
  if (!db) throw new Error("Banco de dados indisponível");
  const result = await db.insert(blogPosts).values(input);
  return getBlogPostById(Number(result[0].insertId));
}

export async function updateBlogPost(id: number, values: Partial<InsertBlogPost>) {
  const db = await getDb();
  if (!db) throw new Error("Banco de dados indisponível");
  await db.update(blogPosts).set(values).where(eq(blogPosts.id, id));
}

export async function listActiveNewsletterSubscribers() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.status, "active"));
}

export async function subscribeToNewsletter(email: string, name?: string | null) {
  const db = await getDb();
  if (!db) throw new Error("Banco de dados indisponível");
  await db.insert(newsletterSubscribers).values({ email, name: name || null, status: "active" }).onDuplicateKeyUpdate({ set: { name: name || null, status: "active" } });
}

export async function listNewsletterSubscribers() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(newsletterSubscribers).orderBy(desc(newsletterSubscribers.createdAt));
}

export async function ensureDelivery(postId: number, subscriberId: number, provider: string) {
  const db = await getDb();
  if (!db) throw new Error("Banco de dados indisponível");
  await db.insert(newsletterDeliveries).values({ postId, subscriberId, provider, status: "queued" }).onDuplicateKeyUpdate({ set: { updatedAt: sql`CURRENT_TIMESTAMP` } });
  const result = await db.select().from(newsletterDeliveries).where(and(eq(newsletterDeliveries.postId, postId), eq(newsletterDeliveries.subscriberId, subscriberId))).limit(1);
  return result[0];
}

export async function markDeliverySent(id: number, messageId: string) {
  const db = await getDb();
  if (!db) throw new Error("Banco de dados indisponível");
  await db.update(newsletterDeliveries).set({ status: "sent", providerMessageId: messageId, sentAt: new Date() }).where(eq(newsletterDeliveries.id, id));
}

export async function markDeliveryFailed(id: number, errorMessage: string) {
  const db = await getDb();
  if (!db) throw new Error("Banco de dados indisponível");
  await db.update(newsletterDeliveries).set({ status: "failed", errorMessage }).where(eq(newsletterDeliveries.id, id));
}
