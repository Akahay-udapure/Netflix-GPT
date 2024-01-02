import OpenAI from "openai";
import { OPENAI_SECRET_KEY } from "./constant";

const openai = new OpenAI({
    apiKey: OPENAI_SECRET_KEY, // This is the default and can be omitted
    dangerouslyAllowBrowser: true
});

export default openai;
