import Showdown from 'showdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const MarkdownInput = ({ activeNote, onUpdateNote }) => {
  const handleSave = (field, value) => {
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
  };

  if (!activeNote) return <div className="no-active-note">Pas de Note Affichée</div>;

  const converter = new Showdown.Converter();

  let content = converter.makeHtml(activeNote.body);
  function createMarkup() {
    return {__html: content};
  }
  
  function MyComponent() {
    return <div dangerouslySetInnerHTML={createMarkup()}/>;
  }

  function reduce(){
    console.log("bonjour");
    document.getElementById("edit").classList.toggle("reduce");
    document.getElementById("show").classList.toggle("growth");
    document.getElementById("extend").classList.toggle("rotate");
  }

  return (
    <div className="app-main">
       <div className="app-main-note-preview" id='show'>
        <h1 className="preview-title">{activeNote.title}</h1>
        <div className='app-content'>
          {MyComponent()}
        </div>
      </div>

      <p className='arrow' onClick={reduce}><FontAwesomeIcon icon={faAngleDown} className="extend" id="extend"/></p>      

      <div className="app-main-note-edit" id='edit'>
        <input
          type="text"
          id="title"
          placeholder="Titre de la note"
          value={activeNote.title}
          onChange={(e) => handleSave("title", e.target.value)}
          autoFocus
        />
        <textarea
          id="body"
          placeholder="Ecrivez votre note ici..."
          value={activeNote.body}
          onChange={(e) => handleSave("body", e.target.value)}
        />
      </div>
    </div>
  );
};

export default MarkdownInput;