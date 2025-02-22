import { NextResponse } from 'next/server'
import connectDB from '@/utils/db'
import Order from '@/models/Order';



export async function POST(request){

    try {
        await connectDB()
        const body = await request.json();
        const {
            customerId,
            product,
            quantity,
            address,
            orderAmount,
          } = body;

          if (!customerId || !product || !quantity || !address || !orderAmount) {
            return NextResponse.json(
              { message: "All fields are required" },
              { status: 400 }
            );
          }
          const newOrder = new Order({
            customerId,
            product,
            quantity,
            address,
            orderAmount,
            status,
          });


          await newOrder.save();

          return NextResponse.json(
            { message: "Order placed successfully", orderId: newOrder._id },
            { status: 201 }
          );
        } catch (error) {
          console.error("Order creation failed:", error);
          return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
          );
        }
      }