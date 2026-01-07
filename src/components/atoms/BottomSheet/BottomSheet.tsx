import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { Dimensions, View, Text } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFooterProps,
  BottomSheetHandle,
  BottomSheetHandleProps,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

import { styles } from './styles';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAX_SHEET_SIZE = SCREEN_HEIGHT * 0.8;

interface BottomSheetProps {
  children: React.ReactNode;
  title?: string;
  scroll?: boolean;
  height?: number;
  onDismissed?: () => void;
  footerComponent?: React.FC<BottomSheetFooterProps>;
}

export type BottomSheetRef = {
  open: () => void;
  close: () => void;
};

export const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  (props, ref) => {
    const {
      children,
      title,
      scroll = false,
      onDismissed,
      footerComponent,
    } = props;
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const BottomSheetContainer = scroll
      ? BottomSheetScrollView
      : BottomSheetView;

    // callbacks
    const handlePresentModalPress = useCallback(() => {
      bottomSheetModalRef.current?.present();
    }, []);

    const handleDismissModalPress = useCallback(() => {
      bottomSheetModalRef.current?.dismiss();
    }, []);

    const handleSheetChanges = useCallback((_index: number) => {
      // console.log('handleSheetChanges', index);
    }, []);

    useImperativeHandle(ref, () => ({
      close: handleDismissModalPress,
      open: handlePresentModalPress,
    }));

    const snapPoints = useMemo(() => {
      return ['75%', '90%'];
    }, []);

    const renderBackdrop = useCallback(
      (backdropProps: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...backdropProps}
          opacity={0.6}
          pressBehavior={'close'}
          appearsOnIndex={1}
          disappearsOnIndex={-1}
        />
      ),
      [],
    );

    const renderHandle = useCallback(
      (handleProps: BottomSheetHandleProps) => {
        return (
          <>
            <BottomSheetHandle {...handleProps} />
            {title && (
              <View>
                <View style={styles.headerContainer}>
                  <Text style={{
                    fontFamily: "Bold",
                  }}>
                    {title}
                  </Text>
                </View>
              </View>
            )}
          </>
        );
      },
      [title],
    );

    return (
      <BottomSheetModal
        keyboardBlurBehavior="restore"
        keyboardBehavior="extend"
        handleIndicatorStyle={{
          backgroundColor: 'grey',
          paddingTop: 6,
          width: 60,
        }}
        handleStyle={{
          backgroundColor: '#DDDDDD',
          borderTopRightRadius: 14,
          borderTopLeftRadius: 14,
          paddingTop: 16,
        }}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: '#DDDDDD' }}
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        onDismiss={onDismissed}
        enablePanDownToClose={true}
        enableDynamicSizing
        handleComponent={renderHandle}
        maxDynamicContentSize={MAX_SHEET_SIZE}
        onChange={handleSheetChanges}
        footerComponent={footerComponent}>
        <BottomSheetContainer
          style={styles.contentContainer}
          showsVerticalScrollIndicator={false}>
          <View
            style={[
              styles.modalContainer,
            ]}>
            {children}
          </View>
        </BottomSheetContainer>
      </BottomSheetModal>
    );
  },
);
