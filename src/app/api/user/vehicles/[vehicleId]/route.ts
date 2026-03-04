import { NextRequest, NextResponse } from 'next/server';
import { updateVehicle, deleteVehicle } from '@/lib/firestore-utils';
import { getUserSession } from '@/lib/session';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ vehicleId: string }> }) {
  try {
    const session = await getUserSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized or invalid session' }, { status: 401 });
    }
    const uid = session.uid;
    const { vehicleId } = await params;

    const updates = await req.json();

    await updateVehicle(uid, vehicleId, updates);
    return NextResponse.json({ message: 'Vehicle updated successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating vehicle:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ vehicleId: string }> }) {
  try {
    const session = await getUserSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized or invalid session' }, { status: 401 });
    }
    const uid = session.uid;
    const { vehicleId } = await params;

    await deleteVehicle(uid, vehicleId);
    return NextResponse.json({ message: 'Vehicle deleted successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error deleting vehicle:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
