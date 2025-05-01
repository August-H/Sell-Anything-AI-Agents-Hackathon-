![Your AI Agent for Sales (2048 x 1365 px)](https://github.com/user-attachments/assets/8316a42c-97ca-411e-aaaa-da9ee411f08d)

# Project Name

**Sell Anything - The AI Powered Sales Assistant**


## Project Description:
Sales Agent AI is an end-to-end cold outreach assistant that automates research, email discovery, validation, and pitch generation. Leveraging Perplexity’s real-world research API, OpenAI’s ChatGPT, AnyMailFinder, and NeverBounce, it transforms product details and target buyer profiles into highly personalized, ready-to-send cold emails.

🗂️ **Data Sources:**  
- **Perplexity Research API:** Gathers industry insights and contextual information about leads.  
- **AnyMailFinder API:** Discovers accurate business email addresses for your prospects.  
- **NeverBounce API:** Extra verification that the email AnyMailFinder finds is deliverable.  
- **User Context:** Captures feedback on sent emails to drive future personalization and performance tracking.


🎯 **Who is this for?**  
- **Sales Professionals** looking to scale outreach without manual legwork.  
- **Founders & Entrepreneurs** who need fast, polished cold emails to pitch investors or customers.  
- **Business Development Teams** aiming to boost reply rates through data-driven personalization.

❗ **Disclaimer:**
- **Success Rate** is around 75%, **NOT 100%**
- Follow the terms and conditions of AnyMailFinder, Perplexity, NeverBounce, and OpenAI

# How To Use:

- **Single Request** Simply type in information about the person ( Name, Role at Company, Company Name ) and what you want to sell them, and we'll do the rest!
- **Bulk CSV Mode** Upload a CSV file with the columns: "fullName", "company", and "summary". 

----
 # Bulk CSV Table Example

 ## Before:
 
| Full Name  | Company | Summary |
| :------------: |:---------------:| :-----:|
| Bill Gates      | Microsoft | He started a company called Microsoft, a technology based startup which helped bring computers to billions |
| Jeff Bezos      | Amazon        |   He started a company called Amazon, a retail company that helped connect buyers and sellers through the internet |
| Ken Johnston | Autonomic        |    Executive engineering manager for Cloud Services, Data Science, and Ethical AI. Experienced in managing large multi-national engineering teams from forty to three hundred employees across the United States, Canada, Europe, and Asia. |


## After ( Returned CSV ):  

| Full Name     | Company    | Summary | Email                    | Email Verification Status | Personalized Email |
|:-------------:|:----------:|:--------|:------------------------:|:-------------:|:--------------------|
| Bill Gates    | Microsoft  | He started a company called Microsoft, a technology based startup which helped bring computers to billions | bill.gates@microsoft.com | success | Hi Bill, What you built with Microsoft is nothing short of legendary. Bringing computing power to billions of people changed the trajectory of the entire world—not just tech. That kind of vision and scale is incredibly rare, and it’s a major reason I wanted to reach out. I’ve built something that might have accelerated that global impact even further—an automated outreach system designed to help innovators like you scale their influence and connections instantly. Whether it’s for philanthropy, partnerships, or early-stage ideas, the system identifies high-fit targets, personalizes messages at scale, and automates delivery—saving hundreds of hours while maintaining authenticity. If you're even slightly curious, I'd love to show you how it works. No fluff—just a quick look at something I believe even Microsoft would've used back in the garage days. Would you be open to a quick call or demo? |
| Jeff Bezos    | Amazon     | He started a company called Amazon, a retail company that helped connect buyers and sellers through the internet | jeff.bezos@amazon.com | success | Hi Jeff, The scale and vision behind Amazon still amazes me. You not only redefined e-commerce, but laid the groundwork for cloud computing, logistics, and customer obsession as a mindset. That kind of pioneering energy is what inspired me to build an outreach automation system that helps visionaries like you scale relationships and impact at record pace. This tool personalizes high-quality cold outreach, making it effortless to connect with key stakeholders—without losing authenticity. If this sounds interesting, I’d love to show you how it works. Just a short demo, no strings. Let me know! |
| Ken Johnston  | Autonomic  | Executive engineering manager for Cloud Services, Data Science, and Ethical AI. Experienced in managing large multi-national engineering teams from forty to three hundred employees across the United States, Canada, Europe, and Asia. | ken.johnston@autonomic.com | success | Hi Ken, Your work at the intersection of Cloud Services, Data Science, and Ethical AI is exactly the kind of leadership the tech world needs more of. Managing engineering teams across multiple continents while keeping AI ethical and scalable is no small feat. I’ve built an outreach automation system that I believe could complement leaders like you—it identifies high-priority connections, personalizes engagement at scale, and drives communication with precision. Happy to give you a demo if you're open to exploring how it might support your ongoing work. Let me know what works best. |


                
----


![asdfasdfasdfasdf](https://github.com/user-attachments/assets/65949ac0-cd65-4a67-ae6d-b93c4b33cd2a)

![imaasdfasdfge](https://github.com/user-attachments/assets/7108d2bf-7405-493c-bc31-50a54b98a82e)




# How To Run:

Unfortunately due to API costs, we are not able to provide a free endpoint. However, if you are intersted in running Sell Anything follow these instructions:

## SignUp for the following API Services:
- **OpenAI ChatGPT API SignUp**: https://platform.openai.com/signup
- **Perplexity API SignUp**: https://docs.perplexity.ai/home
- **AnyMailFinder API SignUp**: https://anymailfinder.com/pricing
- **NeverBounce API SignUp**: https://app.neverbounce.com/register

## Populate the .env file with the API Keys following this structure:


```javascript
OPENAI_APIKEY=ENTER KEY HERE
PERPLEXITYAI_API_KEY=ENTER KEY HERE
ANYMAILFINDER_APIKEY=ENTER KEY HERE
NEVERBOUNCE_APIKEY=ENTER KEY HERE


```

# Agent Flowchart


![User (5)](https://github.com/user-attachments/assets/d2b375c3-4b1a-4297-a947-af31288b9b43)









## Team Leader: 
[August Hayes](https://github.com/August-H)

## Team Members:
[Danny Konopatksi](https://github.com/Danny513)
[Johaan Mannanal](https://github.com/Johaan-Mannanal)
[Tejaswi Erratu](https://github.com/TejaswiErattu)
