"use client"

import {loadStripe} from "@stripe/stripe-js"
import { useEffect } from "react"
import { useToast } from "../ui/use-toast"
import { checkoutCredits } from "@/lib/actions/transaction.action"
import { Button } from "../ui/button"

const Checkout = ({plan,amount,credits,buyerId}:{plan:string;amount:number;credits:number;buyerId:string}) => {

    const {toast} = useToast();

    useEffect(()=>{
        loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
    },[]);

    useEffect(()=>{
        const query = new URLSearchParams(window.location.search);
        if(query.get("success")){
            toast({
                title:"Order Placed!",
                description:"You Will Recieve an Email Confirmation",
                duration:5000,
                className:"success-toast"
            })
        }
        if(query.get("canceled")){
            toast({
                title:"Order Canceled!",
                description:"Continue To Shop around and continue when you are ready",
                duration:5000,
                className:"error-toast"
            })
        }
    },[]);

    const onCheckout = async () => {
        const transaction = {
            plan,
            amount,
            credits,
            buyerId
        };
        await checkoutCredits(transaction);
    }

    return(
        <form action={onCheckout} method="POST">
            <section>
                <Button type="submit" role="link" className="w-full rounded-full bg-purple-gradient bg-cover">
                    Buy Credit
                </Button>
            </section>
        </form>
    );
};

export default Checkout;