import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCustomer = async ({ email }) => {
    try {
        const customer = await stripe.customers.create({
            email,
        });
        return {
            ok: true,
            customer,
        };
    } catch (e) {
        return {
            ok: false,
            error: e,
        };
    }
}

export const createCustomerSession = async ({ customerId }) => {
    try {
        const session = await stripe.customerSessions.create({
            customer: customerId,
            components: {
                pricing_table: {
                    enabled: true,
                },
            },
        });
        return {
            ok: true,
            session,
        };
    } catch (e) {
        return {
            ok: false,
            error: e,
        };
    }
}
