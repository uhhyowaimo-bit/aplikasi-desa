// File: src/app/api/visitors/route.ts

import { NextResponse } from "next/server";

// Simulasi data visitor
let dailyCount = 123;
let weeklyCount = 789;
let totalCount = 5678;

export async function GET() {
  return NextResponse.json({
    daily: dailyCount,
    weekly: weeklyCount,
    total: totalCount,
  });
}

export async function POST() {
  dailyCount += 1;
  weeklyCount += 1;
  totalCount += 1;

  return NextResponse.json({
    status: "ok",
    message: "Visitor count incremented",
  });
}
