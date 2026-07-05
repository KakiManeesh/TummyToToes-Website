import { type NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = {
  _type?: string;
  slug?: { current?: string };
};

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    if (!secret) {
      console.error("[revalidate] SANITY_REVALIDATE_SECRET is not configured");
      return new Response("Revalidation is not configured", { status: 500 });
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      secret,
      true, // add small delay so Sanity CDN is up-to-date before we revalidate
    );

    if (!isValidSignature) {
      console.error("[revalidate] Invalid signature — request rejected");
      return new Response("Invalid signature", { status: 401 });
    }

    // Keep the public pages fresh after Sanity publish events.
    revalidatePath("/");
    revalidatePath("/gallery");

    if (body?._type) {
      revalidateTag(body._type);
    }
    if (body?._type === "galleryCategory") {
      revalidateTag("galleryCategory");
    }

    console.log(`[revalidate] Revalidated public pages for _type="${body?._type}"`);
    return NextResponse.json({
      revalidated: true,
      paths: ["/", "/gallery"],
      type: body?._type ?? "unknown",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[revalidate] Error:", message);
    return new Response(message, { status: 500 });
  }
}
