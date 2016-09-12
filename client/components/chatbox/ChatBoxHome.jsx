import React from 'react';
import PanelBody from '../core/PanelBody.jsx';
import ChatBoxBodySection from './ChatBoxBodySection.jsx';

class ChatBoxHome extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    let offlineInfo, directionList, favList, searchList;
    if (this.props.user.status === 'offline'){
      offlineInfo = <div><p>Vous êtes déconnecté du serveur de messagerie instantanée.</p><p>Vous pouvez rafraichir la page pour vous reconnecter.</p></div>;
    }
    else {
      if (this.props.searchState){
        searchList = <ChatBoxBodySection title="Recherche" list={this.props.searchList} noUserMessage="La recherche n'a retouné aucun résultat."/>
      }
      else {
        directionList = <ChatBoxBodySection noDisplayInvisible={true} title={this.props.user.direction[1]} list={this.props.directionList} noUserMessage="Aucun utilisateur n'est connecté."/>
        favList = <ChatBoxBodySection title="Mes favoris" list={this.props.favList} noUserMessage="Vous n'avez aucun favori."/>
      }
    }
    return (
      <div role="tabpanel" className={(this.props.currentTab === "home") ? "tab-pane fade active in" : "tab-pane fade"} id="home">
        {offlineInfo}
        {searchList}
        {directionList}
        {favList}
      </div>
    );
  }
}

export default ChatBoxHome;
