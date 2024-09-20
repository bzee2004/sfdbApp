
export default function Row(props) {
    return (
        <tr>
            <td>{props.crew}</td>
            <td>{props.lane}</td>
            <td>{props.time}</td>
            <td>{props.placement}</td>
            <td>{props.next_heat}</td>
            <td>{props.estimated_start_time}</td>
        </tr>
    )
}