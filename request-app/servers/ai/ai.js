import { Configuration, OpenAIApi } from "openai";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(cors());
app.use(express.json());
const port = 8080;

const requirementsProperties =
  "Necessary; Feasible; Correct; Concise; Ambiguous; Complete; Consistent; Verifiable; Traceable; Allocated; Design independent; Nonredundant; Written using the standard construct; Avoid of escape clauses";

app.post("/api/ai/topics", async (req, res) => {
  const { requirement } = req.body;
  const answer = await getTopics(requirement);
  const answerWithPrefix = `----Generated by AI----\n${answer}\n----End of AI generated text----`;
  res.send({ answer: answerWithPrefix });
});

app.post("/api/ai/functional", async (req, res) => {
  const { requirement } = req.body;
  const answer = await isFunctional(requirement);
  res.send({ answer });
});

app.post("/api/ai/create/functional", async (req, res) => {
  const { description } = req.body;
  const answer = await getFunctionalRequirements(description);
  res.send({ answer });
});

app.post("/api/ai/create/nonfunctional", async (req, res) => {
  const { description } = req.body;
  const answer = await getNonFunctionalRequirements(description);
  res.send({ answer });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

async function getTopics(requirement) {
  const openai = new OpenAIApi(config);
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Write 3-4 topics, each with one line that helps the user defining the 
                    following requirement: ${requirement}.`,
        },
      ],
      max_tokens: 200,
    });

    return completion.data.choices[0].message?.content;
  } catch (error) {
    console.log(error);
  }
}


// check if the requirement is functional or non-functional
async function isFunctional(requirement) {
  const openai = new OpenAIApi(config);
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `The following requirement: ${requirement}, is functional or non-functional? 
          Answer with "functional" or "non-functional".`,
        },
      ],
      max_tokens: 200,
    });

    return completion.data.choices[0].message?.content;
  } catch (error) {
    console.log(error);
  }
}

async function getFunctionalRequirements(description) {
  const openai = new OpenAIApi(config);
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `
            The following properties should be followed when writing a requirement: ${requirementsProperties}.
            For the following description of a project: ${description}, please provide a list of 5 functional 
            requirements for the project.
            `,
        },
      ],
      max_tokens: 300,
    });
    return getRequirementsAsArray(completion.data.choices[0].message?.content);
  } catch (error) {
    console.log(error);
  }
}

async function getNonFunctionalRequirements(description) {
  const openai = new OpenAIApi(config);
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `
                The following properties should be followed when writing a requirement: ${requirementsProperties}.
                For the following description of a project: ${description}, please provide a list of 5 nonfunctional
                requirements for the project. Remove the type/category of the requirement, only the description should be provided.
                `,
        },
      ],
      max_tokens: 300,
    });
    return getRequirementsAsArray(completion.data.choices[0].message?.content);
  } catch (error) {
    console.log(error);
  }
}

// function to get that sets each of a requirement in a array position and remove the numbering
function getRequirementsAsArray(requirements) {
  const requirementsArray = requirements
    .split("\n")
    .map((requirement) => requirement.replace(/\d+\.\s/g, ""))
    .filter((requirement) => requirement.trim() !== "");
  
  return requirementsArray;
}

