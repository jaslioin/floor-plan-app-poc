# Floor-App

## TODO
- [ ] Prototype authentication
    - login/logout
    - session
- [ ] CRUD
- [ ] 'Canvas editor'

## React-Native Notes
- MUST use `<View>` with area to wrap `<Image>`
    ```js
    <View style={{width:100,height:100}}>
        <Image/>
    </View>
    ```
    - coz `<Image>` is `position:absolute`
    - use case: inside `TouchableOpacity` without `<View>`, press event will be slippery, as the touch area is small AF
- `top/bottom/left/right` not support by react native animation