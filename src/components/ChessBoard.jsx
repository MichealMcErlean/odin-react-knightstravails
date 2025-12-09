import styles from './ChessBoard.module.css';

export default function ChessBoard({board, onClick}) {

  function darkOrLight(rowI, colI) {
    if (rowI % 2 == 0) {
      if (colI % 2 == 0) {
        return styles.lightSquare;
      } else {
        return styles.darkSquare;
      }
    } else {
      if (colI % 2 == 0) {
        return styles.darkSquare;
      } else {
        return styles.lightSquare;
      }
    }
  }

  return (
    <div className={styles.chessboard}>
      {board.map((row, rowI) => (
        <div key={rowI} className={styles.boardRow}>
          {row.map((value, colI) => (
            <div
              key={`${rowI}-${colI}`}
              data-cell={`${rowI}-${colI}`}
              className={darkOrLight(rowI, colI)}
              onClick={onClick}
            >
              {value != '.' ? value : ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}