export function calculateSubnet(ip: string, subnetMask: string) {
    // Convert IP address and subnet mask to binary format
    const ipBinary = ipToBinary(ip);
    const subnetMaskBinary = ipToBinary(subnetMask);
  
    // Calculate network address
    const networkAddressBinary = calculateNetworkAddress(ipBinary, subnetMaskBinary);
    const networkAddress = binaryToIp(networkAddressBinary);
  
    // Calculate broadcast address
    const broadcastAddressBinary = calculateBroadcastAddress(networkAddressBinary, subnetMaskBinary);
    const broadcastAddress = binaryToIp(broadcastAddressBinary);
  
    // Calculate the number of hosts
    const numberOfHosts = calculateNumberOfHosts(subnetMaskBinary);
  
    return {
      ip,
      subnetMask,
      networkAddress,
      broadcastAddress,
      numberOfHosts,
      subnetMaskBinary,
      ipBinary,
    };
  }
  
  function ipToBinary(ip: string): string {
    return ip.split('.')
      .map(octet => parseInt(octet, 10).toString(2).padStart(8, '0'))
      .join('');
  }
  
  function binaryToIp(binary: string): string {
    return binary.match(/.{1,8}/g)!
      .map(byte => parseInt(byte, 2).toString(10))
      .join('.');
  }
  
  function calculateNetworkAddress(ipBinary: string, subnetMaskBinary: string): string {
    let networkAddressBinary = '';
    for (let i = 0; i < ipBinary.length; i++) {
      networkAddressBinary += ipBinary[i] === '1' && subnetMaskBinary[i] === '1' ? '1' : '0';
    }
    return networkAddressBinary;
  }
  
  function calculateBroadcastAddress(networkAddressBinary: string, subnetMaskBinary: string): string {
    let broadcastAddressBinary = '';
    for (let i = 0; i < networkAddressBinary.length; i++) {
      broadcastAddressBinary += subnetMaskBinary[i] === '1' ? networkAddressBinary[i] : '1';
    }
    return broadcastAddressBinary;
  }
  
  function calculateNumberOfHosts(subnetMaskBinary: string): number {
    const numberOfZeros = subnetMaskBinary.split('0').length - 1;
    return Math.pow(2, numberOfZeros) - 2;
  }
  