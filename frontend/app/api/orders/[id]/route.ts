import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const authorization = request.headers.get("Authorization");
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (authorization) {
      headers["Authorization"] = authorization;
    }

    const res = await fetch(`${BACKEND_URL}/api/orders/${id}`, {
      headers,
    });

    if (!res.ok) {
      if (res.status === 404)
        return new Response("Order not found", { status: 404 });
      return new Response(res.statusText, { status: res.status });
    }
    const json = await res.json();
    return NextResponse.json(json.data);
  } catch (error) {
    console.error("Order GET error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const authorization = request.headers.get("Authorization");
    if (!authorization) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await request.json();
    const payload = {
      description: body.description,
      items: body.items,
    };

    console.log(payload);

    const res = await fetch(`${BACKEND_URL}/api/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: authorization,
      },
      body: JSON.stringify({
        order: payload,
      }),
    });

    if (!res.ok) {
      if (res.status === 404)
        return new Response("Order not found", { status: 404 });
      return new Response(res.statusText, { status: res.status });
    }
    const json = await res.json();

    console.log(json);
    return NextResponse.json(json.data);
  } catch (error) {
    console.error("Order PUT error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const authorization = request.headers.get("Authorization");
    if (!authorization) {
      return new Response("Unauthorized", { status: 401 });
    }
    const res = await fetch(`${BACKEND_URL}/api/orders/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: authorization,
      },
    });

    if (!res.ok) {
      if (res.status === 404)
        return new Response("Order not found", { status: 404 });
      return new Response(res.statusText, { status: res.status });
    }
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Order DELETE error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
