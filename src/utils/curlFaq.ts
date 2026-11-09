import type { CurlType } from "@/lib/supabase/types";

export type FaqEntry = {
  question: string;
  answer: string;
};

const lowerFirst = (value: string) =>
  value ? value.charAt(0).toLowerCase() + value.slice(1) : value;

const withoutTrailingDot = (value: string) => value.replace(/\.\s*$/, "");

/**
 * Builds the FAQ for one curvature from its own editorial copy, so the visible
 * questions and the FAQPage markup always say exactly the same thing.
 */
export function buildCurlFaq(curl: CurlType): FaqEntry[] {
  const [firstCharacteristic, secondCharacteristic] = curl.characteristics;
  const [firstStep, secondStep] = curl.finishing;
  const care = curl.care.slice(0, 3).join(" ");

  return [
    {
      question: `O que caracteriza o cabelo ${curl.code}?`,
      answer: `${curl.summary} Os sinais que costumam aparecer são: ${withoutTrailingDot(
        lowerFirst(firstCharacteristic),
      )}; ${withoutTrailingDot(lowerFirst(secondCharacteristic))}.`,
    },
    {
      question: `Como finalizar o cabelo ${curl.code}?`,
      answer: `${firstStep.title}. ${firstStep.text} Depois, ${lowerFirst(
        secondStep.title,
      )}. ${secondStep.text}`,
    },
    {
      question: `Que rotina de cuidado combina com o cabelo ${curl.code}?`,
      answer: `${care} A frequência importa mais do que a quantidade aplicada de uma vez.`,
    },
  ];
}