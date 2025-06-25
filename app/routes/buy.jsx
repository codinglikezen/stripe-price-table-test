import { json } from "@remix-run/node";

import { Link, useLoaderData } from "@remix-run/react";
import { createCustomerSession } from "./stripe.server";

export const loader = async () => {
    const pk = process.env.STRIPE_PUBLIC_KEY;
    const prctbl = process.env.STRIPE_PRICE_TABLE_ID;
    const customerId = process.env.STRIPE_CUSTOMER_ID;
    let ok = true;
    let sessionId = null;

    if (typeof customerId === 'string' && customerId.startsWith('cus_')) {
        const result = await createCustomerSession({
            customerId,
        });
        ok = result.ok;
        if (ok) {
            sessionId = result.session.client_secret;
        }
    }

    return json({
        ok,
        customerId,
        pk,
        prctbl,
        sessionId,
    });
}

const Buy = () => {
    const { customerId, pk, prctbl, sessionId } = useLoaderData();

    if (typeof customerId !== 'string' || !customerId.startsWith('cus_')) {
        return (
            <>
                <p>
                    {"No Customer ID found in .env file. create at "}
                </p>
                <Link to="/user">User Page</Link>
                <p>
                    {"and copy it to .env file."}
                </p>

            </>
        )
    }

    return (
        <>
            <p>
                {`Your CustomerId: ${customerId}`}
            </p>
            <p>
                {`Your SessionId: ${sessionId}`}
            </p>
            <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
            <stripe-pricing-table
                pricing-table-id={prctbl}
                publishable-key={pk}
                client-reference-id={`${customerId}-${sessionId}`}
                customer-session-client-secret={sessionId}
            >
            </stripe-pricing-table>
        </>
    )
}

export default Buy;