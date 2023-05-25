import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// GET Request
export const GET = async (request, {params}) => {
    try {
        console.log("tag params in api:",params.tag);
        await connectToDB();
        const prompt = await Prompt.find({tag: params.tag}).populate('creator')
        if(!prompt) return new Response("Prompt not found!", {status: 404})
        return new Response(JSON.stringify(prompt), {status: 200})
    } catch (error) {
        return new Response("Failed to fetch prompt", {status: 500})
    }
}
