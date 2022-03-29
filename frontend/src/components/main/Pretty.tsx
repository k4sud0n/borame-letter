export interface PrettyProps {
  text: string;
  style?: React.CSSProperties;
}

const regex = /[a-zA-Z0-9ㄱ-ㅎ가-힣]/;
const Pretty = ({ style, text }: PrettyProps): JSX.Element => {
  const textArray = text.split('');

  return (
    <div style={style}>
      {textArray.map((it, index) => (
        it === '\n'
          ? <br key={index} />
          : (
            <span
              key={index}
              className={`pretty ${regex.test(it) ? 'down' : ''}`}
              style={{ '--i': index } as any}
            >
              {it}
            </span>
          )
      ))}
    </div>
  );
};

export default Pretty;
