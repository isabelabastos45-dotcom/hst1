const MODEL = "@cf/zai-org/glm-4.7-flash";

export async function onRequestGet({ env }) {
  return Response.json({
    ok: true,
    configured: Boolean(env && env.AI),
    model: MODEL,
  });
}
