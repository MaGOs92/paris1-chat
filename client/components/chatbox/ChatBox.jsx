import React from 'react';
import ReactDOM from 'react-dom';
import ChatBoxHeader from './ChatBoxHeader.jsx';
import ChatBoxMinimized from './ChatBoxMinimized.jsx';
import ChatBoxHome from './ChatBoxHome.jsx';
import ChatBoxMessage from './ChatBoxMessage.jsx';
import ChatBoxOptions from './ChatBoxOptions.jsx';
import ChaBoxAbout from './ChatBoxAbout.jsx';
import SearchInput from './SearchInput.jsx';

class ChatBox extends React.Component {
  constructor(props){
    super(props);
    this.state = this.props.state;
    this.countNotifications = this.countNotifications.bind(this);
  }
  countNotifications(){
    let users = [];
    Object.keys(this.props.roomList).map((room) => {
      if (!this.props.roomList[room].lastMessage.viewed && this.props.user.uid !== this.props.roomList[room].lastMessage.owner){
        users.push(this.props.roomList[room].penpal.name);
      }
    });
    return users;
  }

  render() {
    let chatBox;
    let searchInput;
    let styleHeight;
    if (this.state.currentTab === "home" || this.state.currentTab === "message"){
      styleHeight = {height: "323px"};
      searchInput = <SearchInput />;
    }
    if (!this.state.minimized){
      chatBox = <div className="panel panel-default">
                  <ChatBoxHeader notification={this.countNotifications().length} minimized={this.state.minimized} status={this.props.user.status} currentTab={this.state.currentTab}/>
                  <div style={styleHeight} className="tab-content">
                    <ChatBoxHome user={this.props.user} directionLists={this.props.directionLists} favList={this.props.favList}
                    searchState={this.props.searchState} searchList={this.props.searchList} currentTab={this.state.currentTab}/>
                    <ChatBoxMessage user={this.props.user} searchState={this.props.searchState} searchList={this.props.searchList} roomList={this.props.roomList} currentTab={this.state.currentTab}/>
                    <ChatBoxOptions user={this.props.user} preferences={this.props.preferences} currentTab={this.state.currentTab}/>
                    <ChaBoxAbout currentTab={this.state.currentTab}/>
                  </div>
                  {searchInput}
                </div>;
    }
    else {
      chatBox = <ChatBoxMinimized status={this.props.user.status} notification={this.countNotifications()} />;
    }
    return (
      <div className="window chat-window col-xs-12 col-md-12">
        {chatBox}
      </div>
    );
  }
}

export default ChatBox;
