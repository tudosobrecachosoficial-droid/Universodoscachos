type Props = {
  loading: boolean;
  error: string | null;
  onRetry: () => void;
};

export default function SupabaseState({ loading, error, onRetry }: Props) {
  if (loading) {
    return (
      <div className="empty" role="status" aria-live="polite">
        <p>Carregando conteúdo...</p>
      </div>
    );
  }

  if (!error) return null;

  return (
    <div className="empty" role="alert">
      <h3>Não foi possível carregar os dados</h3>
      <p>{error}</p>
      <button type="button" className="clear-link" onClick={onRetry}>
        Tentar novamente
      </button>
    </div>
  );
}
