import { test, expect} from "@playwright/test";
import * as data from "../constants/constants.json"

import { softwareUpdateFlow } from "../flows/softwareUpdateFlow";
import { CloudObjects } from "../management/cloudObjects";
import { DUTs, DUT1, DUT2, DUT3, DUT4 } from "../constants/duts";


test.describe("SoftwareUpdate ->", async() => {

    test.beforeEach(async ({page, baseURL}) => {

        const cloud = new CloudObjects(page)

        await cloud.page.goto(`${baseURL}`)
        await cloud.login_obj.login(data.user, data.password)
        await cloud.login_obj.selectAccount(data.account2)
        // await cloud.page.waitForTimeout(2000)
        await cloud.page.waitForLoadState()
    })

    test ("1.Test to verify if you can upgrade to a new software - Particular Switch - EX3028R-P", async({page,baseURL}) => {

        const cloud = new CloudObjects(page)
        const softUpdateFlow = new softwareUpdateFlow(page)

        await softUpdateFlow.searchAndSelectDUT(DUT4[0].name)
        await softUpdateFlow.updateDUT(data.image_to_upgrade)
        await softUpdateFlow.confirmTargetAndClickShowMore(1, data.image_to_upgrade)
        await softUpdateFlow.confirmUpgradeDowngrade(DUT4[0].name, data.image_to_upgrade, 1, 210000)

    })

    test.only ("2.Test to verify if you can downgrade to an older software - Particular Switch - EX3028R-P", async({page,baseURL}) => {

        const cloud = new CloudObjects(page)
        const softUpdateFlow = new softwareUpdateFlow(page)

        await softUpdateFlow.searchAndSelectDUT(DUT4[0].name)
        await softUpdateFlow.updateDUT(data.image_to_downgrade)
        await softUpdateFlow.confirmTargetAndClickShowMore(1, data.image_to_downgrade)
        await softUpdateFlow.confirmUpgradeDowngrade(DUT4[0].name, data.image_to_downgrade, 1, 210000)

    })

    test ("3.Test to verify if you can not upgrade/downgrade to the same software - Particular Switch - EX3028R-P", async({page,baseURL}) => {

        const cloud = new CloudObjects(page)
        const softUpdateFlow = new softwareUpdateFlow(page)

        await softUpdateFlow.searchAndSelectDUT(DUT4[0].name)
        await softUpdateFlow.updateDUT(data.image_to_upgrade)
        await softUpdateFlow.confirmTargetAndClickShowMore(1, data.image_to_upgrade)
        await softUpdateFlow.confirmDetails(DUT4[0].name, "Skipped", "Device is already running same version!", 1)

    })

    test ("4.Test to verify if you can upgrade to a new software - Switch Group - EX3028R-P", async({page,baseURL}) => {

        const cloud = new CloudObjects(page)
        const softUpdateFlow = new softwareUpdateFlow(page)

        await softUpdateFlow.searchAndSelectSwitchGroup(data.switchgroup)
        await softUpdateFlow.updateDUTSwitchGroup(DUT4[0].name, data.image_to_upgrade, 1)
        await softUpdateFlow.confirmTargetAndClickShowMore(1, data.image_to_upgrade)
        await softUpdateFlow.confirmUpgradeDowngrade(DUT4[0].name, data.image_to_upgrade, 1, 210000)

    })

    test ("5.Test to verify if you can downgrade to an older software - Switch Group - EX3028R-P", async({page,baseURL}) => {

        const cloud = new CloudObjects(page)
        const softUpdateFlow = new softwareUpdateFlow(page)

        await softUpdateFlow.searchAndSelectSwitchGroup(data.switchgroup)
        await softUpdateFlow.updateDUTSwitchGroup(DUT4[0].name, data.image_to_downgrade, 1)
        await softUpdateFlow.confirmTargetAndClickShowMore(1, data.image_to_downgrade)
        await softUpdateFlow.confirmUpgradeDowngrade(DUT4[0].name, data.image_to_downgrade, 1, 210000)

    })

    test ("6.Test to verify if you can not upgrade/downgrade to the same software - Switch Group - EX3028R-P", async({page,baseURL}) => {

        const cloud = new CloudObjects(page)
        const softUpdateFlow = new softwareUpdateFlow(page)

        await softUpdateFlow.searchAndSelectSwitchGroup(data.switchgroup)
        await softUpdateFlow.updateDUTSwitchGroup(DUT4[0].name, data.image_to_downgrade, 1)
        await softUpdateFlow.confirmTargetAndClickShowMore(1, data.image_to_downgrade)
        await softUpdateFlow.confirmDetails(DUT4[0].name, "Skipped", "Device is already running same version!", 1)

    })

    test ("7.Test to verify if you can upgrade muliple switches to a new software - Switch Group - 2 DUTs", async({page,baseURL}) => {

        const cloud = new CloudObjects(page)
        const softUpdateFlow = new softwareUpdateFlow(page)

        await softUpdateFlow.searchAndSelectSwitchGroup(data.switchgroup)
        await softUpdateFlow.updateAllDUTsSwitchGroup(data.switchgroup, data.image_to_upgrade)
        await softUpdateFlow.confirmTargetAndClickShowMore(1, data.image_to_upgrade)
        await softUpdateFlow.confirmAllUpgradeDowngrade(DUT3[0].name, DUT4[0].name, data.image_to_upgrade, 1, 2, 270000)

    })

    test ("8.Test to verify if you can upgrade muliple switches to an older software - Switch Group - 2 DUTs", async({page,baseURL}) => {

        const cloud = new CloudObjects(page)
        const softUpdateFlow = new softwareUpdateFlow(page)

        await softUpdateFlow.searchAndSelectSwitchGroup(data.switchgroup)
        await softUpdateFlow.updateAllDUTsSwitchGroup(data.switchgroup, data.image_to_downgrade)
        await softUpdateFlow.confirmTargetAndClickShowMore(1, data.image_to_downgrade)
        await softUpdateFlow.confirmAllUpgradeDowngrade(DUT3[0].name, DUT4[0].name, data.image_to_downgrade, 1, 2, 270000)

    })

    test ("9.Test to verify if you can can not upgrade/downgrade to the same software if all DUTs have the same software - Switch Group - 2 DUTs", async({page,baseURL}) => {

        const cloud = new CloudObjects(page)
        const softUpdateFlow = new softwareUpdateFlow(page)

        await softUpdateFlow.searchAndSelectSwitchGroup(data.switchgroup)
        await softUpdateFlow.updateAllDUTsSwitchGroup(data.switchgroup, data.image_to_upgrade)
        await softUpdateFlow.confirmTargetAndClickShowMore(1, data.image_to_upgrade)
        await softUpdateFlow.confirmDetails(DUT3[0].name, "Skipped", "Device is already running same version!", 1)
        await softUpdateFlow.confirmDetails(DUT4[0].name, "Skipped", "Device is already running same version!", 2)

    })

})

