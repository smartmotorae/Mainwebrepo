import { NextRequest, NextResponse } from 'next/server';
import { addVehicle, getVehicles } from '@/lib/firestore-utils';
import { getUserSession } from '@/lib/session';

export async function GET(req: NextRequest) {
  try {
    const session = await getUserSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized or invalid session' }, { status: 401 });
    }
    const uid = session.uid;

    const vehicles = await getVehicles(uid);
    return NextResponse.json(vehicles, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching vehicles:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getUserSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized or invalid session' }, { status: 401 });
    }
    const uid = session.uid;

    const vehicleData = await req.json();
    const newVehicle = await addVehicle(uid, vehicleData);
    return NextResponse.json(newVehicle, { status: 201 });
  } catch (error: any) {
    console.error('Error adding vehicle:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
