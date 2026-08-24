export type GrammarSuggestion = {
  meaning: string;
  structure: string;
  jlptLevel: "N5" | "N4" | "N3" | "N2" | "N1";
  explanation: string;
};

export async function generateGrammarSuggestion(
  title: string,
): Promise<GrammarSuggestion> {
  const response = await fetch("/api/grammar/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  const data: unknown = await response.json();
  if (
    typeof data !== "object" ||
    data === null ||
    !("suggestion" in data) ||
    typeof data.suggestion !== "object" ||
    data.suggestion === null
  ) {
    throw new Error("Invalid grammar suggestion response");
  }

  const suggestion = data.suggestion as Record<string, unknown>;
  if (
    typeof suggestion.meaning !== "string" ||
    typeof suggestion.structure !== "string" ||
    typeof suggestion.jlptLevel !== "string" ||
    !["N5", "N4", "N3", "N2", "N1"].includes(suggestion.jlptLevel) ||
    typeof suggestion.explanation !== "string"
  ) {
    throw new Error("Invalid grammar suggestion response");
  }

  return suggestion as GrammarSuggestion;
}
