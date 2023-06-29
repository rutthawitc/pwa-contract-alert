import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET() {
  try {
    const data = await fs.readFile(
      path.join(process.cwd(), "data", "data.json"),
      "utf8"
    );
    //console.log(process.cwd());
    //res.status(200).json(JSON.parse(data));
    //parsing to Json object
    return NextResponse.json(JSON.parse(data), { status: 200 });
  } catch (error) {
    //console.log(error);
    //res.status(500).json({ message: "Internal Server Error" });
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
