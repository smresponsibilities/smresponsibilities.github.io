export interface LeetCodeQuestion {
  number: number;
  title: string;
}

export function extractLeetCodeQuestions(content: unknown): LeetCodeQuestion[] {
  if (!content || typeof content !== 'string') return [];
  
  let textToSearch = content;
  const lcIndex = content.search(/leetcode\s*[:\.]?/i);
  if (lcIndex !== -1) {
    textToSearch = content.slice(lcIndex);
  }

  const regex = /(?:\"|\b)(\d{1,5})\.[\s\u00A0]+([^\"\n#\r]+)(?:\"|\r|\n|$)/g;
  const questions: LeetCodeQuestion[] = [];
  let m: RegExpExecArray | null;
  while ((m = regex.exec(textToSearch)) !== null) {
    const num = parseInt(m[1], 10);
    let title = m[2].trim().replace(/^[\s\u00A0]+|[\s\u00A0]+$/g, '');
    title = title.replace(/^[\"\'\s]+|[\"\'\s]+$/g, '');
    
    if (
      title.length > 2 && 
      !/^(easy|medium|hard|approach|solution|method|step|first|second|year|day|month|hours?|min|mins|minutes|streak|questions?|pts|points)\b/i.test(title) &&
      !/^\d+$/.test(title)
    ) {
      if (!questions.some(q => q.number === num)) {
        questions.push({ number: num, title });
      }
    }
  }
  return questions;
}
