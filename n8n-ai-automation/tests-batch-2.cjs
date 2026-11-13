const fs=require('fs'),assert=require('assert'),path=require('path');let count=0;
const slugs=["email-classifier","review-insights","proposal-drafter","spend-classifier","product-copy"];
for(const slug of slugs){
const read=f=>JSON.parse(fs.readFileSync(path.join(__dirname,slug,f),'utf8'));
const w=read('workflow.json'),sample=read('sample-input.json'),example=read('example-output.json').result;
const code=w.nodes.find(n=>n.name==='Validate Result').parameters.jsCode;
const execute=out=>new Function('$input','$',code)({first:()=>({json:{choices:[{finish_reason:'stop',message:{content:JSON.stringify(out)}}]}})},()=>({first:()=>({json:{input:sample}})}));
for(const key of Object.keys(example)){assert.throws(()=>execute({...example,[key]:null}));count++;}
const arrayKey=Object.keys(example).find(k=>Array.isArray(example[k]));
if(arrayKey){assert.throws(()=>execute({...example,[arrayKey]:[42]}));count++;}
if(slug==='email-classifier'){assert.throws(()=>execute({...example,category:'unknown'}));count++;}
if(slug==='review-insights'){assert.throws(()=>execute({...example,evidence:['invented quote']}));count++;}
if(slug==='spend-classifier'){assert.throws(()=>execute({...example,category:'Unknown'}));count++;}
if(slug==='product-copy'){assert.throws(()=>execute({...example,title:'x'.repeat(81)}));count++;}
assert.equal(w.active,false);count++;
assert.equal(w.nodes.find(n=>n.name==='Authenticated Intake').parameters.authentication,'headerAuth');count++;
}console.log(count+' additional negative/security configuration checks passed.');
