import { NextResponse, NextRequest } from "next/server";

const PINATA_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwYTQ5MjY3Yy00NGU1LTQ3ZTYtOWUwNS04ZTI5YzNlNDU1MDgiLCJlbWFpbCI6InNpZ24uYW5raXQxNEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNmQwOTJjNGFkNmYwNWYzNmY2ODEiLCJzY29wZWRLZXlTZWNyZXQiOiJhNGExNTE4MTdjNTIwMTIzNWI5ODgzM2ZjYzc3MzM3MzY5ZTEwYjIyYmM5NmUwOWZkNGJmMzUzYTgzOWM0ZDNhIiwiaWF0IjoxNzExMjgwMDEwfQ.mVcfHmC1N7E2bitipwgTlEr4YNU0MX5wHCqBoaYXMgI"

export const config = {
  api: {
    bodyParser: false,
  },
};



export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    data.append("file", file);
    data.append("pinataMetadata", JSON.stringify({ name: "File to upload" }));
    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`,
      },
      body: data,
    });
    const { IpfsHash } = await res.json();
    console.log(IpfsHash);

    return NextResponse.json({ IpfsHash }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
