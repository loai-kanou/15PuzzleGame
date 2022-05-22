const Tile = ({ index, pos, onClick, gap, isRight }) => {
    const top = pos[0] * 85 + gap
    const left = pos[1] * 85 + gap

    return (
        <div
            className={isRight ? `tile tile__correct` : `tile`}
            onClick={onClick}
            style={{ top, left }}
        >{index+1}</div>
    )
}

export { Tile }
