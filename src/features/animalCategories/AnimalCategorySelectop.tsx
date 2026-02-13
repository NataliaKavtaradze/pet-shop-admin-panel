import { useAppSelector } from "../../app/hooks"

interface Props {
  selectedIds: number[]
  onChange: (ids: number[]) => void
}

const AnimalCategorySelector = ({ selectedIds, onChange }: Props) => {
  const categories = useAppSelector(state => state.categories.items)

  const toggleCategory = (id: number) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter(c => c !== id))
    } else {
      onChange([...selectedIds, id])
    }
  }

  return (
    <div>
      <label>Categories</label>

      {categories.map(cat => (
        <div key={cat.id}>
          <input
            type="checkbox"
            checked={selectedIds.includes(cat.id)}
            onChange={() => toggleCategory(cat.id)}
          />
          {cat.name}
        </div>
      ))}
    </div>
  )
}

export default AnimalCategorySelector
