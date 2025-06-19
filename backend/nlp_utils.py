# nlp_utils.py
from langchain.chains.question_answering import load_qa_chain
from langchain_community.llms import Ollama
from langchain.docstore.document import Document

# Create the LLM and QA chain once for reuse
llm = Ollama(model="mistral")
qa_chain = load_qa_chain(llm, chain_type="stuff")

def get_answer_from_text(text, question):
    docs = [Document(page_content=text)]
    return qa_chain.run(input_documents=docs, question=question)
