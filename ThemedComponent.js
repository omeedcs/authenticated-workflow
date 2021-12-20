import React, {useState} from 'react'
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  TextInput,
  Switch,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native'
import {ButtonGroup, Button, Input, Icon, ListItem, Avatar, SearchBar} from 'react-native-elements'
import Theme, {shadowProps, ThemeContext, withTheme} from '../constants/Theme'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

export function ScreenContainer({
  scrolls,
  SAVStyle,
  style,
  contentContainerStyle,
  scrollHeader,
  ...props
}) {
  return (
    <ThemeContext.Consumer>
      {({theme}) => (
        <View style={{flex: 1}}>
          <SafeAreaView
            style={[
              {
                backgroundColor: Theme[theme].primary,
                paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
              },
              SAVStyle
            ]}
          />
          {scrolls ? (
            <View style={{backgroundColor: 'transparent', flex: 1}}>
              {scrollHeader}
              <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                {...props}
                contentContainerStyle={[
                  {backgroundColor: Theme[theme].primary},
                  contentContainerStyle
                ]}
                style={[{flex: 1, backgroundColor: Theme[theme].primary}, style]}
              />
            </View>
          ) : (
            <KeyboardAvoidingView
              {...props}
              style={[{flex: 1, backgroundColor: Theme[theme].primary}, style]}
            />
          )}
        </View>
      )}
    </ThemeContext.Consumer>
  )
}

export function ThemedButtonGroup(props) {
  const {containerStyle, color, float, textColor, ...rest} = props
  return (
    <ThemeContext.Consumer>
      {({theme}) => (
        <ButtonGroup
          selectedButtonStyle={{
            backgroundColor: color || Theme[theme].secondary
          }}
          buttonStyle={{
            backgroundColor: Theme[theme].gray,
            justifyContent: 'center'
          }}
          textStyle={{fontFamily: Theme.mf, color: Theme[theme].secondary}}
          selectedTextStyle={{color: Theme[theme].primary}}
          innerBorderStyle={{width: 0}}
          containerStyle={[
            {borderWidth: 0, marginLeft: 0, marginRight: 0, borderRadius: 10},
            float && shadowProps(5),
            containerStyle
          ]}
          {...rest}
        />
      )}
    </ThemeContext.Consumer>
  )
}

export function ThemedButton(props) {
  const {
    title,
    onPress,
    buttonStyle,
    titleStyle,
    color,
    height,
    type,
    float,
    containerStyle,
    tc,
    ...rest
  } = props

  const defaultStyle = (theme) => {
    return {
      solid: StyleSheet.create({
        btn: {backgroundColor: color || Theme[theme].gray},
        title: {color: color ? 'white' : Theme[theme].secondary}
      }),
      outline: StyleSheet.create({
        btn: {
          backgroundColor: 'transparent',
          borderColor: color || Theme.accent,
          borderWidth: 1
        },
        title: {color: color || Theme.accent}
      }),
      clear: StyleSheet.create({
        btn: {backgroundColor: 'transparent'},
        title: {color: color || Theme.accent}
      })
    }
  }

  return (
    <ThemeContext.Consumer>
      {({theme}) => {
        const def = defaultStyle(theme)[type || 'solid']
        return (
          <Button
            title={title}
            onPress={onPress}
            buttonStyle={[
              def.btn,
              {
                borderRadius: 10,
                height: 35,
                paddingTop: 0,
                paddingBottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center'
              },
              !type && shadowProps(10),
              buttonStyle
            ]}
            titleStyle={[def.title, {fontFamily: Theme.mfb, fontSize: 14}, titleStyle]}
            containerStyle={[{marginLeft: 0, marginRight: 0}, containerStyle]}
            titleProps={{allowFontScaling: false}}
            disabledTitleStyle={{color: Theme[theme].gray2}}
            disabledStyle={{backgroundColor: Theme[theme].gray}}
            type={type}
            {...rest}
          />
        )
      }}
    </ThemeContext.Consumer>
  )
}

export const highlightingBackground = (focused) => {
  let backgroundColor = 'rgba(245, 247, 251,'
  backgroundColor += focused ? '0.5' : '0.2'
  backgroundColor += ')'
  return backgroundColor
}

export const ThemedInput = withTheme((props) => {
  const {
    containerStyle,
    inputStyle,
    inputContainerStyle,
    highlights,
    theme,
    maxLength,
    ...rest
  } = props
  const [focused, setFocused] = useState(false)
  let backgroundColor = Theme[theme].gray
  if (highlights) {
    backgroundColor = highlightingBackground(focused)
  }
  return (
    <Input
      maxLength={maxLength || 100}
      containerStyle={[{paddingLeft: 0, paddingRight: 0, marginBottom: 5}, containerStyle]}
      inputContainerStyle={[
        {
          backgroundColor: backgroundColor,
          borderBottomWidth: 0,
          borderRadius: 5
        },
        inputContainerStyle
      ]}
      labelStyle={{color: Theme.mc, fontFamily: Theme.mf}}
      onBlur={() => setFocused(false)}
      onFocus={() => setFocused(true)}
      placeholderTextColor={Theme[theme].gray2}
      inputStyle={[
        {
          fontFamily: Theme.mf,
          color: Theme[theme].secondary,
          opacity: 1,
          paddingLeft: 5
        },
        inputStyle
      ]}
      {...rest}
    />
  )
})

export const ThemedTextInput = React.forwardRef(({style, ...props}, ref) => {
  return (
    <ThemeContext.Consumer>
      {({theme}) => (
        <TextInput
          ref={ref}
          style={[{color: Theme[theme].secondary, fontFamily: 'Proxima Nova'}, style]}
          placeholderTextColor={Theme[theme].gray2}
          {...props}
        />
      )}
    </ThemeContext.Consumer>
  )
})

export function ThemedText(props) {
  const {bold, children, oneLine, color, size, style, center, translucentBg, ...rest} = props
  if (oneLine) {
    return (
      <ThemeContext.Consumer>
        {({theme}) => (
          <View style={{flex: 1}}>
            <Text
              numberOfLines={1}
              style={[
                {
                  fontFamily: bold ? 'Proxima Nova Bold' : 'Proxima Nova',
                  color: color || Theme[theme].secondary,
                  backgroundColor: translucentBg && 'rgba(245, 247, 251, 0.2)',
                  fontSize: size || 16,
                  textAlign: (center && 'center') || 'left',
                  flexShrink: 1
                },
                style
              ]}
              allowFontScaling={false}
              {...rest}
            >
              {children}
            </Text>
          </View>
        )}
      </ThemeContext.Consumer>
    )
  }

  return (
    <ThemeContext.Consumer>
      {({theme}) => (
        <Text
          style={[
            {
              fontFamily: bold ? 'Proxima Nova Bold' : 'Proxima Nova',
              color: color || Theme[theme].secondary,
              backgroundColor: translucentBg && 'rgba(245, 247, 251, 0.2)',
              fontSize: size || 16,
              textAlign: (center && 'center') || 'left'
            },
            style
          ]}
          allowFontScaling={false}
          {...rest}
        >
          {children}
        </Text>
      )}
    </ThemeContext.Consumer>
  )
}

export function ThemedIcon(props) {
  const {name, type, color, size, onPress, ...rest} = props

  let fullName = name

  if (!type || type === 'ionicon') {
    fullName = (Platform.OS === 'ios' ? 'ios-' : 'md-') + name
  }
  const sz = size || 26
  if (Platform.OS === 'ios') {
    // sz += 5;
  }

  return (
    <ThemeContext.Consumer>
      {({theme}) => (
        <Icon
          name={fullName}
          Component={onPress && TouchableOpacity}
          onPress={onPress}
          size={sz}
          type={type || 'ionicon'}
          color={color || Theme[theme].secondary}
          iconStyle={{
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0
          }}
          {...rest}
        />
      )}
    </ThemeContext.Consumer>
  )
}

export function ThemedAvatar(props) {
  const {rounded, size, source, ...rest} = props

  return (
    <Avatar
      size={size || 30}
      rounded={rounded || true}
      source={source}
      icon={
        source
          ? undefined
          : {
              name: Platform.OS === 'ios' ? 'ios-person' : 'md-person',
              type: 'ionicon',
              color: 'white'
            }
      }
      {...rest}
    />
  )
}

export function ThemedListItem(props) {
  const {
    user,
    title,
    onPress,
    disabled,
    containerStyle,
    contentContainerStyle,
    titleStyle,
    bottomDivider,
    ...rest
  } = props

  return (
    <ListItem
      leftAvatar={user && <ThemedAvatar source={user.avatar} />}
      title={title || user.name}
      Component={onPress && TouchableOpacity}
      onPress={onPress}
      bottomDivider={bottomDivider || false}
      disabled={disabled || false}
      containerStyle={[{height: 40, borderRadius: 15, overflow: 'hidden'}, containerStyle]}
      contentContainerStyle={[
        {height: 40, borderRadius: 15, overflow: 'hidden'},
        contentContainerStyle
      ]}
      titleStyle={[{fontFamily: Theme.mf, fontSize: 16}, titleStyle]}
      subtitleStyle={{fontFamily: Theme.mf, fontSize: 12}}
      {...rest}
    />
  )
}

export function ThemedSearchBar(props) {
  const {
    containerStyle,
    contentContainerStyle,
    inputContainerStyle,
    inputStyle,
    leftIconContainerStyle,
    rightIconContainerStyle,
    placeholderTextColor,
    placeholder,
    ...rest
  } = props

  return (
    <ThemeContext.Consumer>
      {({theme}) => (
        <SearchBar
          placeholder={placeholder || 'Type a name or number...'}
          placeholderTextColor={placeholderTextColor || Theme[theme].gray2}
          containerStyle={[
            {
              backgroundColor: Theme[theme].primary,
              borderTopColor: 'transparent',
              borderBottomColor: 'transparent'
            },
            containerStyle
          ]}
          inputContainerStyle={[
            {backgroundColor: Theme[theme].gray, height: 35},
            inputContainerStyle
          ]}
          inputStyle={[
            {
              backgroundColor: Theme[theme].gray,
              fontFamily: Theme.mf,
              color: Theme[theme].secondary,
              fontSize: 16,
              paddingHorizontal: 2
            },
            inputStyle
          ]}
          leftIconContainerStyle={[{backgroundColor: Theme[theme].gray}, leftIconContainerStyle]}
          rightIconContainerStyle={[{backgroundColor: Theme[theme].gray}, rightIconContainerStyle]}
          round
          {...rest}
        />
      )}
    </ThemeContext.Consumer>
  )
}

export function ThemedSwitch(props) {
  // const { containerStyle,...rest } = props;
  return (
    <ThemeContext.Consumer>
      {({theme}) => (
        <Switch
          thumbColor={Theme[theme].primary}
          trackColor={{
            true: Theme.accent,
            false: Theme[theme].gray2
          }}
          {...props}
        />
      )}
    </ThemeContext.Consumer>
  )
}
