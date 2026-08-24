export async function generateGrammarSuggestion(): Promise<string> {
    try {
        const response = await fetch('/api/grammar/new');
        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }

        const data: unknown = await response.json();
        if (
            typeof data !== 'object' ||
            data === null ||
            !('suggestion' in data) ||
            typeof data.suggestion !== 'string'
        ) {
            throw new Error('Invalid grammar suggestion response');
        }

        return data.suggestion;
    }
    catch (error) {
        console.error(error);
        return "エラーが発生しました";
    }
}