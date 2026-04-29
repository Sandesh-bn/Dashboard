import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function TypeDropDown({type, setType}) {

    const types = [ 'clouds_new', 'precipitation_new', 'pressure_new', 'wind_new', 'temp_new' ]

    return (
        <Select className="relative z-1001 capitalize" value={type} onValueChange={setType}>
            <SelectTrigger className="w-full max-w-50">
                <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Map Type</SelectLabel>
                    {types.map((type) => (
                        <SelectItem className='capitalize' value={type}>{type.split('_')[0]}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
