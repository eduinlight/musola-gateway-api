import { GatewaysService } from './gateways.service';
import { GatewayRepositoryMock } from '../../data_manager/repositories/gateway.repository.mock';
import { GatewayDontExist } from '../exceptions/gateway_dont_exist';
import { IGateway } from '../../data_manager/models/gateway.model';
import { PeripheralRepositoryMock } from '../../data_manager/repositories/peripheral.repository.mock';
import {
  EPeripheralStatus,
  IPeripheral,
} from '../../data_manager/models/peripheral.model';
import { PeripheralDontExist } from '../exceptions/peripheral_dont_exist';
import { GatewayFull } from '../exceptions/gateway_full';

describe('GatewayService', () => {
  let gatewayService: GatewaysService;

  beforeEach(async () => {
    const peripheralsRepository = new PeripheralRepositoryMock();
    const gatewayRepositoryMock = new GatewayRepositoryMock(
      peripheralsRepository,
    );
    gatewayService = new GatewaysService(
      peripheralsRepository as any,
      gatewayRepositoryMock as any,
    );
  });

  test('get throw exception if not found', async () => {
    await expect(gatewayService.get('232323')).rejects.toEqual(
      new GatewayDontExist(),
    );
  });

  test('create', async () => {
    const data: IGateway = {
      serial: '22222',
      name: 'GW1',
      ipv4: '127.0.0.1',
    };
    let gateway = await gatewayService.create(data);

    expect(gateway).toBeDefined();

    gateway = await gatewayService.get(gateway.id);
    expect(gateway).toBeDefined();
    expect(gateway).toMatchObject(data);
  });

  test('update', async () => {
    const data: IGateway = {
      serial: '22222',
      name: 'GW1',
      ipv4: '127.0.0.1',
    };

    await expect(gatewayService.update('232323', data)).rejects.toEqual(
      new GatewayDontExist(),
    );

    let gateway = await gatewayService.create(data);

    expect(gateway).toBeDefined();
    expect(gateway).toMatchObject(data);

    data.serial = '444444';

    gateway = await gatewayService.update(gateway.id, data);
    expect(gateway).toBeDefined();
    expect(gateway).toMatchObject(data);
  });

  test('filter', async () => {
    const gatewaysData: IGateway[] = [
      {
        serial: '1111',
        name: 'GW1',
        ipv4: '127.0.0.1',
      },
      {
        serial: '2222',
        name: 'GW2',
        ipv4: '127.0.0.2',
      },
      {
        serial: '3333',
        name: 'GW3',
        ipv4: '127.0.0.3',
      },
      {
        serial: '4444',
        name: 'GW4',
        ipv4: '127.0.0.4',
      },
    ];

    for (const data of gatewaysData) {
      const gateway = await gatewayService.create(data);
      expect(gateway).toBeDefined();
      expect(gateway).toMatchObject(data);
    }

    expect(await gatewayService.filter(0, 1)).toMatchObject([gatewaysData[0]]);
    expect(await gatewayService.filter(0, 3)).toMatchObject([
      gatewaysData[0],
      gatewaysData[1],
      gatewaysData[2],
    ]);
    expect(await gatewayService.filter(1000, 10)).toMatchObject([]);
    expect(await gatewayService.filter(0, 0)).toMatchObject([]);
  });

  test('delete', async () => {
    await expect(gatewayService.delete('232323')).rejects.toEqual(
      new GatewayDontExist(),
    );

    const data: IGateway = {
      serial: '22222',
      name: 'GW1',
      ipv4: '127.0.0.1',
    };
    const gateway = await gatewayService.create(data);

    expect(gateway).toBeDefined();

    await expect(gatewayService.delete(gateway.id)).resolves.toEqual(
      gateway.id,
    );

    expect(gatewayService.get(gateway.id)).rejects.toEqual(
      new GatewayDontExist(),
    );
  });

  test('addPeripheral', async () => {
    const gatewayData: IGateway = {
      serial: '22222',
      name: 'GW1',
      ipv4: '127.0.0.1',
    };
    let gateway = await gatewayService.create(gatewayData);

    expect(gateway).toBeDefined();

    const data: Omit<IPeripheral, 'gateway'> = {
      uid: 1,
      vendor: 'HP',
      dateCreated: new Date(),
      status: EPeripheralStatus.ONLINE,
    };
    const peripheral = await gatewayService.addPeripheral(gateway.id, data);

    expect(peripheral).toBeDefined();
    expect(peripheral).toMatchObject(data);

    gateway = await gatewayService.get(gateway.id);
    expect(gateway).toBeDefined();
    expect(gateway.peripherals.length).toBe(1);
  });

  test('gateways cant have more that 10 peripherals', async () => {
    const gatewayData: IGateway = {
      serial: '22222',
      name: 'GW1',
      ipv4: '127.0.0.1',
    };
    let gateway = await gatewayService.create(gatewayData);

    expect(gateway).toBeDefined();

    const data: Omit<IPeripheral, 'gateway'> = {
      uid: 1,
      vendor: 'HP',
      dateCreated: new Date(),
      status: EPeripheralStatus.ONLINE,
    };
    for (let i = 0; i < 10; i++) {
      await gatewayService.addPeripheral(gateway.id, data);
    }

    gateway = await gatewayService.get(gateway.id);
    expect(gateway).toBeDefined();
    expect(gateway.peripherals.length).toBe(10);

    await expect(
      gatewayService.addPeripheral(gateway.id, data),
    ).rejects.toEqual(new GatewayFull());
  });

  test('updatePeripheral', async () => {
    await expect(gatewayService.updatePeripheral(20, {})).rejects.toEqual(
      new PeripheralDontExist(),
    );

    const gatewayData: IGateway = {
      serial: '22222',
      name: 'GW1',
      ipv4: '127.0.0.1',
    };
    const gateway = await gatewayService.create(gatewayData);

    expect(gateway).toBeDefined();

    const data: Omit<IPeripheral, 'gateway'> = {
      uid: 1,
      vendor: 'HP',
      dateCreated: new Date(),
      status: EPeripheralStatus.ONLINE,
    };
    let peripheral = await gatewayService.addPeripheral(gateway.id, data);

    expect(peripheral).toBeDefined();
    expect(peripheral).toMatchObject(data);

    data.uid = 2;

    peripheral = await gatewayService.updatePeripheral(peripheral.id, data);
    expect(peripheral).toBeDefined();
    expect(peripheral).toMatchObject(data);
  });

  test('removePeripheral', async () => {
    await expect(gatewayService.deletePeripheral(20)).rejects.toEqual(
      new PeripheralDontExist(),
    );

    const gatewayData: IGateway = {
      serial: '22222',
      name: 'GW1',
      ipv4: '127.0.0.1',
    };
    let gateway = await gatewayService.create(gatewayData);

    expect(gateway).toBeDefined();

    const data: Omit<IPeripheral, 'gateway'> = {
      uid: 1,
      vendor: 'HP',
      dateCreated: new Date(),
      status: EPeripheralStatus.ONLINE,
    };
    const peripheral = await gatewayService.addPeripheral(gateway.id, data);

    expect(peripheral).toBeDefined();
    expect(peripheral).toMatchObject(data);

    gateway = await gatewayService.get(gateway.id);
    expect(gateway).toBeDefined();
    expect(gateway.peripherals.length).toBe(1);

    await expect(
      gatewayService.deletePeripheral(peripheral.id),
    ).resolves.toEqual(peripheral.id);

    gateway = await gatewayService.get(gateway.id);
    expect(gateway).toBeDefined();
    expect(gateway.peripherals.length).toBe(0);
  });
});
