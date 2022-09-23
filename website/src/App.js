import { useState } from 'react';

import { Steps, Alert, Typography } from 'antd';

import BasicForm from './containers/BasicForm';
import ExtraForm from './containers/ExtraForm';

import logo from './logo.svg';

import './App.less';

const { Title } = Typography;

function App() {
  const [stepAtual, setStepAtual] = useState(0);
  const [establishmentUID, setEstablishmentUID] = useState(null);
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <div className="multistep">
        <Steps current={stepAtual}>
          <Steps.Step
            title="Dados Básicos"
            description="Preenchimento das informações essenciais." />
          <Steps.Step
            title="Extra"
            description="Informações adicionais para melhorar a otimização." />
          <Steps.Step
            title="Fim"
            description="Conclusão do processo de cadastro." />
        </Steps>
        <div className="multistep__content">
          { stepAtual == 0 && <BasicForm onEnd={ (uid) => {
            setEstablishmentUID(uid);
            setStepAtual(stepAtual + 1);
          }} /> }
          { stepAtual == 1 && <ExtraForm
            establishmentUID={establishmentUID}
            onEnd={() => setStepAtual(stepAtual + 1)}
            /> }
          { stepAtual == 2 && <Alert
            message="Muito Obrigado."
            description="O cadastro do seu estabelecimento foi concluído com sucesso."
            type="success"
            showIcon
          /> }
        </div>
      </div>
    </div>
  );
}

export default App;
