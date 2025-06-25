import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { createCustomer } from "./stripe.server";

export const loader = async () => {
    const envCustomerId = process.env.STRIPE_CUSTOMER_ID;
    let ok = true;
    let customerId = null;

    if (typeof envCustomerId !== 'string' || !envCustomerId.startsWith('cus_')) {
        const result = await createCustomer({
            email: "customer@example.com",
        });
        console.log(result);
        ok = result.ok;
        if (ok) {
            customerId = result.customer.id;
        }
    } else {
        customerId = envCustomerId;
    }

    return json({
        ok,
        customerId,
    });
}

const User = () => {
    const { customerId } = useLoaderData();

    return (
        <>
            <p>
                {`Your customer ID is: ${customerId}. copy this to .env file`}
            </p>
        </>
    )
}

export default User;