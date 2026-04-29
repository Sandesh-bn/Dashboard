import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function LocationDropDown({location, setLocation}) {

    const locations = [
        'Los Angeles',
        'New York',
        'Dubai',
        'London',
        'Paris',
        'Milan',
        'Tokyo',
        'Beijing'
    ]

    return (
        <Select className="relative z-1001" value={location} onValueChange={setLocation}>
            <SelectTrigger className="w-full max-w-50">
                <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>City</SelectLabel>
                    {locations.map((location) => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
