const medlemmar = Object.values(import.meta.glob('../../data/medlemmar/*.md', {eager: true}))
const medlemmarFrontmatter = medlemmar.map(medlem => medlem.frontmatter)
console.log(medlemmarFrontmatter)
const NyhetCardEntry = ({ entry, widgetFor, viewStyle }) => {
  const styles = {
    data: {
        fontSize: '16px',
        width: '25%'
    }
  }
  return (
    <div style={{ padding: "16px", width: "100%" }}>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
          <div
            style={{
              display: "flex",
              flexDirection: viewStyle === "grid" ? "column" : "row",
              alignItems: "center",
              gap: "38px",
              flexGrow: "1",
            }}
          >
            <strong style={styles.data}>{entry.data.title}</strong>
            <span style={styles.data}>{entry.data.authors.map((uuid, index) =>
                <span>
                    {medlemmarFrontmatter.find(medlem => medlem.Uuid === uuid).namn}
                    {entry.data.authors[index + 1] && ', '}
                </span>
                
            )}</span>
            <span style={styles.data}>{entry.data.date}</span>
          </div>
          <div
            className="published"
            style={{
                backgroundColor: entry.data.draft === true ? 'grey' : 'green',
                color: 'white',
                border: 'none',
                padding: '4px 8px',
                textAlign: 'center',
                textDecoration: 'none',
                display: 'inline-block',
                cursor: 'pointer',
                borderRadius: '4px',
                fontStyle: 'strong',
                boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px',
                marginLeft: 'auto'
                
              }}
          >
            {entry.data.draft === true ? 'Utkast' : 'Publicerad'}
          </div>
      </div>
    </div>
  );
};
export default NyhetCardEntry;