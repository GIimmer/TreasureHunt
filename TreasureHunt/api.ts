import { ILocation } from './typescript'

const ​treasureApi​ = {​
    getTreasureSites​:​ async (): Promise<ILocation[]> => {
        ​await​ new ​Promise​(​res​ => ​setTimeout​(() => ​res​(), ​750​ + ​750​ * ​Math​.​random​()))​
        return​ [
            { ​id:​​1​, ​latitude:​​47.6492166666667​, ​longitude:​ -​122.351333333333​ },
            { ​id:​​2​, ​latitude:​​47.64605​, ​longitude:​ -​122.35015​ },
            { ​id:​​3​, ​latitude:​​47.6514​, ​longitude:​ -​122.350833333333​ },
            { ​id:​​4​, ​latitude:​​47.64945​, ​longitude:​ -​122.34815​ },
            { ​id:​​5​, ​latitude:​​47.65015​, ​longitude:​ -​122.348733333333​ },
            { ​id:​​6​, ​latitude:​​47.6478333333333​, ​longitude:​ -​122.347633333333​ }
        ]
    },​
    siteHasTreasure​:​ async (​id​: number): Promise<boolean> => {​
        await​ new ​Promise​(​res​ => ​setTimeout​(() => ​res​(), ​750​ + ​750​ * ​Math​.​random​()))
        ​return​​ id​ % ​2​ === ​0 
    }
}

export default treasureApi;