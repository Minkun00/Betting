module.exports = {
  networks: {
    development: {
      host: "172.19.0.1",     // Ganache 앱을 실행 중인 로컬 호스트
      port: 7545,            // Ganache 앱에서 사용하는 포트 번호 (기본값은 7545)
      network_id: "*",        // 모든 네트워크에 대해 설정
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/truffle_abis/',
  migrations_directory: './migrations/',
  tests_directory: './test/',
  compilers: {
    solc: {
      version: '0.8.18',
      optimizer: {
        enabled: true,
        runs: 200
      },
    }
  }
}