interface SearchBoxProps {
  handleSearch: (input: string) => void
  searchInput: string
  postsCount: number
}

export function SearchBox({
  handleSearch,
  searchInput,
  postsCount,
}: SearchBoxProps) {
  return (
    <div className="flex flex-col mt-[72px] gap-3">
      <div className="flex justify-between items-center">
        <span className="font-bold text-brand-baseSubtitle text-lg">
          Publicações
        </span>
        <span className="text-sm text-brand-baseSpan">
          {postsCount} publicações
        </span>
      </div>
      <input
        value={searchInput}
        className="px-4 py-3 bg-brand-baseInput rounded-md placeholder:text-brand-baseLabel"
        type="text"
        placeholder="Buscar conteúdo"
        onChange={(event) => handleSearch(event.target.value)}
      />
    </div>
  )
}
