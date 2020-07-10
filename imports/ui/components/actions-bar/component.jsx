import React, { PureComponent } from "react";
import cx from "classnames";
import { styles } from "./styles.scss";
import DesktopShare from "./desktop-share/component";
import ActionsDropdown from "./actions-dropdown/component";
import QuickPollDropdown from "./quick-poll-dropdown/component";
import AudioControlsContainer from "../audio/audio-controls/container";
import JoinVideoOptionsContainer from "../video-provider/video-button/container";
import CaptionsButtonContainer from "/imports/ui/components/actions-bar/captions/container";
import PresentationOptionsContainer from "./presentation-options/component";
import RecordingIndicator from "/imports/ui/components/nav-bar/recording-indicator/container";
import { withModalMounter } from "/imports/ui/components/modal/service";
import TalkingIndicatorContainer from "/imports/ui/components/nav-bar/talking-indicator/container";

class ActionsBar extends PureComponent {
  render() {
    console.log("actionbar", this.props);
    const {
      amIPresenter,
      handleExitVideo,
      handleJoinVideo,
      handleShareScreen,
      handleUnshareScreen,
      isVideoBroadcasting,
      amIModerator,
      screenSharingCheck,
      enableVideo,
      isLayoutSwapped,
      toggleSwapLayout,
      handleTakePresenter,
      intl,
      currentSlidHasContent,
      parseCurrentSlideContent,
      isSharingVideo,
      screenShareEndAlert,
      stopExternalVideoShare,
      screenshareDataSavingSetting,
      isCaptionsAvailable,
      isMeteorConnected,
      isPollingEnabled,
      isThereCurrentPresentation,
      allowExternalVideo,
      mountModal,
    } = this.props;

    const actionBarClasses = {};

    actionBarClasses[styles.centerWithActions] = amIPresenter;
    actionBarClasses[styles.center] = true;
    actionBarClasses[styles.mobileLayoutSwapped] =
      isLayoutSwapped && amIPresenter;

    return (
      <div className={styles.actionsbar}>
        <div className={styles.left}>
          <ActionsDropdown
            {...{
              amIPresenter,
              amIModerator,
              isPollingEnabled,
              allowExternalVideo,
              handleTakePresenter,
              intl,
              isSharingVideo,
              stopExternalVideoShare,
              isMeteorConnected,
            }}
          />
          {isPollingEnabled ? (
            <QuickPollDropdown
              {...{
                currentSlidHasContent,
                intl,
                amIPresenter,
                parseCurrentSlideContent,
              }}
            />
          ) : null}
          {isCaptionsAvailable ? (
            <CaptionsButtonContainer {...{ intl }} />
          ) : null}
          <RecordingIndicator
            mountModal={mountModal}
            amIModerator={amIModerator}
          />
        </div>
        <div className={cx(actionBarClasses)}>
          <AudioControlsContainer />
          {enableVideo ? (
            <JoinVideoOptionsContainer
              handleJoinVideo={handleJoinVideo}
              handleCloseVideo={handleExitVideo}
            />
          ) : null}
          <DesktopShare
            {...{
              handleShareScreen,
              handleUnshareScreen,
              isVideoBroadcasting,
              amIPresenter,
              screenSharingCheck,
              screenShareEndAlert,
              isMeteorConnected,
              screenshareDataSavingSetting,
            }}
          />
        </div>
        <div className={styles.right}>
          {isLayoutSwapped ? (
            <PresentationOptionsContainer
              toggleSwapLayout={toggleSwapLayout}
              isThereCurrentPresentation={isThereCurrentPresentation}
            />
          ) : null}
          <TalkingIndicatorContainer amIModerator={amIModerator} />
        </div>
      </div>
    );
  }
}

export default withModalMounter(ActionsBar);
