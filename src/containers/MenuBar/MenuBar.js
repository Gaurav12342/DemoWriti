import React, { useState, useEffect, useMemo } from 'react'
import { LogoW } from '../../assets/images/index'
import { Link } from 'react-router-dom'
import { MENU } from '../../constants/Menu'
import { isModuleAccessible, canPerformAction } from '../../util/common'
import { connect } from 'react-redux'
import { USER_TYPE, isAdminUser } from '../../constants/User'
import { ReactComponent as MoreArrow } from '../../assets/images/more-arrow.svg';
import { ACTIONS } from '../../constants/subscription'
const _ = require('lodash')

const menuCount = 7
function MenuBar(props) {

    const { authUser } = props
    const [filteredMenus, setFilteredMenus] = useState([])
    const [loading, setLoading] = useState(true)
    const tenantId = useMemo(() => {
        return localStorage.getItem('tenantId')
    }, [localStorage.getItem('tenantId')])

    useEffect(() => {
        let tempFilMenu = _.cloneDeep(MENU).filter(curMenu => {
            if (curMenu && curMenu.visibilty) {
                curMenu.shallRender = checkPermission(curMenu)

                if (curMenu.children && curMenu.children.length) {
                    curMenu.children = curMenu.children.filter(subMenu => {
                        subMenu.shallRender = checkPermission(subMenu)
                        if (subMenu.shallRender)
                            return subMenu
                    })
                }
            }
            if (curMenu.shallRender)
                return curMenu
        })
        setFilteredMenus(tempFilMenu)
        if (loading) {
            setLoading(false)
        }
    }, [tenantId])
    const checkPermission = (menu) => {
        let isSuperGenAdmin = [USER_TYPE.ADMIN.SUPER, USER_TYPE.ADMIN.GENERAL].indexOf(authUser.type) >= 0
        let shallShow = false
        if (menu) {
            if (isSuperGenAdmin && (menu.hasOwnProperty("excludeGenAdmin") && menu.excludeGenAdmin)) {
                shallShow = false
            } else if ([USER_TYPE.PHARMACY.ADMIN, USER_TYPE.HOME.ADMIN].indexOf(authUser.type) >= 0 && (menu.hasOwnProperty('excludePharHomeAdmin') && menu.excludePharHomeAdmin)) {
                shallShow = false
            }
            else if (isSuperGenAdmin) {
                shallShow = true
            }
            else if (menu.module) {
                shallShow = isModuleAccessible(menu.module, false, menu.subModule)
                if (menu.subModule && !isAdminUser(authUser.type)) {
                    shallShow = canPerformAction({
                        moduleId: menu.module,
                        subModuleId: menu.subModule,
                        checkSubAction: ACTIONS.LIST.CODE
                    })
                }
            }
            else if (menu.children && menu.children.length) {
                let ans = menu.children.some(subMenu => {
                    if ((subMenu.hasOwnProperty('showDefault') && subMenu.showDefault) && isSuperGenAdmin) {
                        return true
                    }
                    if (checkPermission(subMenu)) {
                        return true
                    }
                })
                shallShow = ans
            }
        }
        return shallShow
    }

    function RenderMenuList(menuArr) {
        return menuArr.map(menu => {
            if (menu.visibilty) {
                if (menu.children && menu.children.length) {
                    return < li key={menu.id} >
                        <a>{menu.name} </a>
                        <ul className="submenu">
                            <li>
                                {
                                    menu.children.map(subMenu => {
                                        return (subMenu.hasOwnProperty('isPublic') && !subMenu.isPublic) ? null :
                                            <Link key={subMenu.id} to={subMenu.path} >{subMenu.name}</Link>
                                    })
                                }
                            </li>
                        </ul>
                    </li >
                }
                else {
                    return <li key={menu.id}>
                        <Link to={menu.path} >{menu.name}</Link>
                    </li>
                }
            }
        })
    }

    function RenderMenu(filteredMenu) {
        // console.log("RenderMenu -> filteredMenu", filteredMenu)
        let showMenus = [...filteredMenu], showDropMenu = []
        if (filteredMenu.length > menuCount) {
            showMenus = filteredMenu.slice(0, menuCount)
            // console.log("RenderMenu -> showMenus", showMenus)
            showDropMenu = filteredMenu.slice(menuCount, filteredMenu.length)
            // console.log("RenderMenu -> showDropMenu", showDropMenu)
        }
        return <>
            {RenderMenuList(showMenus)}
            {
                showDropMenu.length > 0 ?
                    <li className="more-h-menu">
                        <a><MoreArrow /></a>
                        <ul className="submenu">
                            {
                                showDropMenu.map(menu => {
                                    const isChildExist = menu.children && menu.children.length > 0
                                    return <li className={isChildExist ? "has-child" : ""}>
                                        <Link to={menu.path} >{menu.name}</Link>
                                        {
                                            isChildExist ? <>
                                                <ul className="sub-child-menu">
                                                    {
                                                        menu.children.map(subMenu => {
                                                            return <li>
                                                                <Link key={subMenu.id} to={subMenu.path} >{subMenu.name}</Link>
                                                            </li>
                                                        })
                                                    }
                                                </ul>
                                            </> : null
                                        }
                                    </li>
                                })
                            }
                        </ul>
                    </li> : null
            }
        </>
    }
    return (<div className="menu">
        <div className="h_logo">
            <LogoW />
        </div>
        <div className="nav_link_wrap">
            <ul>
                {
                    filteredMenus && filteredMenus.length > 0
                        ? RenderMenu(filteredMenus)
                        : null
                    // <Spin spinning={true} />
                }
            </ul>
        </div>
    </div>

    )
}
const mapStateToProps = ({ auth }) => {
    const { authUser } = auth
    return {
        authUser
    }
}
export default connect(mapStateToProps)(MenuBar);
