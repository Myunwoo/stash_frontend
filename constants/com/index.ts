/** Swing 브라우저 SSO SESSION COOKIE NAME  */
export const SWING_SSO_COOKIE_NAME = 'SSOSESSION'

/** Tnet SSO COOKIE NAME  */
export const TNET_SSO_COOKIE_NAME = 'SM_USER'

/** Swing 브라우저에 embed 되는 SSP 2.0 화면의 탭 제한 개수 */
export const SWING_MAX_TAB_COUNT = 8

/** BO의 '스윙 화면(테스트)' 메뉴의 메뉴ID */
export const SWING_TEST_MENU_ID = 'MENU000256'

/** PO권한체크 예외 메뉴ID */
export const PO_HIDDEN_MENU_ID = 'MENU999998'

/** BO권한체크 예외 메뉴ID */
export const BO_HIDDEN_MENU_ID = 'MENU999999'

/** mbrNum을 localStorage 저장하기 위한 키 */
export const AUTH_MBR_NUM = 'AUTH_MBR_NUM'

/** 공통코드를 localStorage 저장하기 위한 키 */
export const COM_CD_LIST = 'comCdList'

/** 유효성 검사 규칙  */
export const VALIDATE_RULES = {
  REQUIRED: {
    regExpRule: /\S/, // 적어도 1개의 문자가 입력됐는지 확인 (공백은 문자로 보지 않음)
    messageId: 'MSG0184',
    messageArg: ''
  },
  NAME: {
    regExpRule: /^[^$\\]{2,30}$/, // 최대 30자리 $ \ 를 제외한 모든 문자 가능
    messageId: 'MSG0188',
    messageArg: ''
  },
  ID: {
    regExpRule: /^[0-9a-z-_.]{6,20}$/, // 6~20자 영소문자,숫자,특문입력
    messageId: 'MSG0185',
    messageArg: ''
  },
  PHONE_NO_DIGIT: {
    regExpRule: /^[0-9-]{8,9}$/, // 휴대폰번호, 전화번호 뒷 8자리 숫자 확인
    messageId: 'MSG0188',
    messageArg: ''
  },
  PHONE_NO: {
    regExpRule: /^[0-9-]{12,13}$/, // 11(10)자리 숫자/-만 사용.
    messageId: 'MSG0188',
    messageArg: ''
  },
  EMAIL: {
    regExpRule: /^[-0-9A-Za-z!#$%&'*+/=?^_`{|}~.]+@[-0-9A-Za-z!#$%&'*+/=?^_`{|}~]+[.]{1}[0-9A-Za-z]/, // 이메일 입력 조건 확인, 영문/숫자/@ 사용.
    messageId: 'MSG0188',
    messageArg: ''
  },
  EMAIL_ID: {
    regExpRule: /^[-_.0-9a-zA-Z]{1,20}$/, // 이메일 계정('@'이전 문자) 입력 조건 확인, 영문/숫자/(특수문자: -_. 허용) 사용. (최대20)
    messageId: 'MSG0188',
    messageArg: ''
  },
  ASSOCIATE_NAME: {
    regExpRule: /^[0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣()&`'-.·,\s]{1,40}$/, // 제휴사명 입력 조건 확인, 한글/영문/숫자/공백 사용 (제휴사명/브랜드명 등). (최대40)
    messageId: 'MSG0188',
    messageArg: ''
  },
  ADMIN_NAME: {
    regExpRule: /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣\s]{1,40}$/, // 한글/영문만 사용. 입력 조건 확인 (관리자명 등). (최대30)
    messageId: 'MSG0188',
    messageArg: ''
  },
  PRODUCT_ID: {
    regExpRule: /^[0-9a-zA-Z]{1,10}$/, // 영문/숫자만 사용. 입력 조건 확인 (상품아이디 등). (최대10)
    messageId: 'MSG0188',
    messageArg: ''
  },
  HANGUL: {
    regExpRule: /^[ㄱ-ㅎㅏ-ㅣ가-힣]*$/, // 한글만 사용
    messageId: 'MSG0186',
    messageArg: '한글만'
  },
  HANGUL_SPACE: {
    regExpRule: /^[ㄱ-ㅎㅏ-ㅣ가-힣\s]*$/, // 한글/스페이스만 사용.
    messageId: 'MSG0186',
    messageArg: '한글만'
  },
  NOT_HANGUL: {
    regExpRule: /^[a-zA-Z0-9\s+\\[\]{}()<>?|`~!@#$%^&*-_+=,.;:"'\\]*$/, // 한글 입력 제한
    messageId: 'MSG0187',
    messageArg: '한글은'
  },
  NUMBER: {
    regExpRule: /^[0-9]*$/, // 숫자만 사용
    messageId: 'MSG0186',
    messageArg: '숫자만'
  },
  NUMBER_FST_NOT_ZERO: {
    regExpRule: /^(?!0)\d*$/, // 숫자만 사용 첫자리 0 불가
    messageId: 'MSG0186',
    messageArg: '숫자만'
  },
  DECIMAL_NUMBER: {
    regExpRule: /^[0-9.]*$/, // 소수점 숫자만 사용
    messageId: 'MSG0186',
    messageArg: '소수점 숫자만'
  },
  COMMA_NUMBER: {
    regExpRule: /^[0-9,]*$/, // , 숫자만 사용
    messageId: 'MSG0186',
    messageArg: '숫자만'
  },
  HANGUL_ENGLISH: {
    regExpRule: /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z]*$/, // 한글, 영문만 사용
    messageId: 'MSG0186',
    messageArg: '한글/영문만'
  },
  ENGLISH_NUMBER: {
    regExpRule: /^[a-zA-Z0-9]*$/, // 영문, 숫자만 사용
    messageId: 'MSG0186',
    messageArg: '영문/숫자만'
  },
  HANGUL_ENGLISH_NUMBER: {
    regExpRule: /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]*$/, // 한글, 영문, 숫자만 사용
    messageId: 'MSG0186',
    messageArg: '한글/영문/숫자만'
  },
  HANGUL_ENGLISH_SPACE: {
    regExpRule: /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z\s]*$/, // 한글/영문/스페이스만 사용.
    messageId: 'MSG0188',
    messageArg: ''
  },
  ENGLISH_NUMBER_SPECIAL: {
    regExpRule: /^[a-zA-Z0-9@!%*#?&]*$/, // 영문, 숫자, 특수문자만 사용
    messageId: 'MSG0186',
    messageArg: '영문/숫자/특수문자만'
  },
  HANGUL_NUMBER: {
    regExpRule: /^[ㄱ-ㅎㅏ-ㅣ가-힣0-9]*$/, // 한글, 영문, 숫자만 사용
    messageId: 'MSG0186',
    messageArg: '한글/숫자만'
  },
  BIZ_NO: {
    regExpRule: /^[0-9-]{12}$|^[0-9]{10}$/, // 12자리 숫자/-만 사용 또는 10자리 숫자만 사용
    messageId: 'MSG0188',
    messageArg: ''
  },
  CORP_NO: {
    regExpRule: /^[0-9-]{14}|^[0-9]{13}$$/, // 14자리 숫자/-만 사용 또는 13자리 숫자만 사용
    messageId: 'MSG0188',
    messageArg: ''
  },
  COLOR_CD: {
    regExpRule: /^#[0-9a-fA-F]{6}$/, // 칼라코드
    messageId: 'MSG0184',
    messageArg: ''
  },
  DATE_YMD: {
    regExpRule: /^(19|20)\d\d.(0[1-9]|1[0-2])\.(0[1-9]|[12][0-9]|3[01])$/, // YYYY.MM.DD
    messageId: 'MSG0188',
    messageArg: '날짜형식 (YYYYY.MM.DD) '
  },
  EXPAND_PHONE_NO: {
    regExpRule: /^[0-9-]{3,}$/, // 3자리 이상 숫자/-만 사용, 전화번호
    messageId: 'MSG0188',
    messageArg: ''
  }
} as const

/** 대용량 파일 업로드 모듈 유형코드/업무 유형코드 */
export const LARGE_FILE_TYPE_CODES = [
  'DCP/DCPEXL',
  'STL/STLSGNCMPR',
  'STL/STLCALRSLT',
  'STL/STLFINREV',
  'PAY/PAYRG',
  'PRD/PRDNOTI',
  'SUB/SUBNOTI',
  'CMP/CMPNOTI',
  'DCP/DCPNOTI',
  'MEM/MEMNOTI',
  'COM/COMNOTI'
]

/** 대용량 파일 업로드 시 사용할 청크 파일 사이즈 (10MB, S3 부분 크기 제한 - 5MB ~ 5GB, 마지막 파일에는 제한없음) */
export const CHUNK_FILE_SIZE = 10 * 1024 * 1024

/** USCAN 이미지 뷰어 플래그 */
export const USCAN_VIEWER_FLAG = {
  DOUBLE_MONITOR: 'A', // window frame
  MOBILE: 'B', // w frame
  SINGLE_MONITOR: 'C' // GLD.ngmf.promise.open
} as const

/** 승인 상태 */
export const APRV_STATE = {
  TEMP_SAVE: '01', // 임시저장
  APRV_WAIT: '10', // 승인대기
  APRV_CMPLT: '20', // 승인완료
  APRV_RJCT: '30', // 승인반려
  RQST_CNCL: '40' // 요청취소
}

/** 승인 상태 아이콘 */
export const APRV_STATE_ICON: { [index: string]: string } = {
  [APRV_STATE.TEMP_SAVE]: 'mdi-content-save-edit-outline', // 임시저장
  [APRV_STATE.APRV_WAIT]: 'mdi-note-edit-outline', // 승인대기
  [APRV_STATE.APRV_CMPLT]: 'mdi-clipboard-check-outline', // 승인완료
  [APRV_STATE.APRV_RJCT]: 'mdi-clipboard-off-outline', // 승인반려
  [APRV_STATE.RQST_CNCL]: 'clipboard-cancel' // 요청취소
}

/** Y/N 아이템 리스트 */
export const YN_ITEM_LIST = [
  { comCdValNm: 'Y', comCdVal: 'Y' },
  { comCdValNm: 'N', comCdVal: 'N' }
]

/** 공통 버튼 ID */
export const BUTTON_ID = {
  ADD: 'btnAdd', // 등록
  UPDATE: 'btnMod', // 수정
  DELETE: 'btnDel', // 삭제
  SAVE: 'btnSave', // 저장
  CANCEL: 'btnCancel', // 취소
  TEMP_SAVE: 'btnSvTemp', // 임시저장
  APRV_ACCEPT: 'btnAprv', // 승인
  APRV_REJECT: 'btnReject', // 승인반려
  APRV_REQ: 'btnApvReq', // 승인요청
  APRV_REQ_CANCEL: 'btnApvReqCancel' // 승인요청취소
}

/** PO Footer 도움말 버튼이 노출되지 않을 페이지 */
export const FOOTER_HELPBUTTON_EXCLUDE_PATTERNS = [
  '/user/ppo-user-invi-info',
  '/user/po-user-invi-expire',
  '/user/po-user-invi-register',
  '/user/po-user-login',
  '/user/po-user-auth',
  '/user/user-register-complete',
  '/user/po-brnd-select',
  '/com/term-agreement',
  '/user/user-login',
  '/user/user-register',
  '/aff/aft/req-guide',
  '/tnet/tnet-test-login',
  '/user/user-pwd-update',
  '/user/po-user-auth-grp-request',
  '/aff/aft/bas-inf-regist'
]

export const MENU_ICON_LIST = [
  { menuId: 'MENU000237', menuIcon: 'prd' },
  { menuId: 'MENU000238', menuIcon: 'sub' },
  { menuId: 'MENU000239', menuIcon: 'pay' },
  { menuId: 'MENU000240', menuIcon: 'dlv' },
  { menuId: 'MENU000241', menuIcon: 'dis' },
  { menuId: 'MENU000242', menuIcon: 'dcp' },
  { menuId: 'MENU000243', menuIcon: 'dsp' },
  { menuId: 'MENU000244', menuIcon: 'mkt' },
  { menuId: 'MENU000245', menuIcon: 'stl' },
  { menuId: 'MENU000246', menuIcon: 'fin' },
  { menuId: 'MENU000247', menuIcon: 'app' },
  { menuId: 'MENU000248', menuIcon: 'cmp' },
  { menuId: 'MENU000249', menuIcon: 'hlp' },
  { menuId: 'MENU000250', menuIcon: 'aff' },
  { menuId: 'MENU000251', menuIcon: 'chn' },
  { menuId: 'MENU000252', menuIcon: 'mem' },
  { menuId: 'MENU000253', menuIcon: 'ust' },
  { menuId: 'MENU000254', menuIcon: 'trm' },
  { menuId: 'MENU000255', menuIcon: 'set' },
  { menuId: 'MENU000414', menuIcon: 'nti' },
  { menuId: 'MENU000372', menuIcon: 'prd' },
  { menuId: 'MENU000373', menuIcon: 'pay' },
  { menuId: 'MENU000374', menuIcon: 'dlv' },
  { menuId: 'MENU000375', menuIcon: 'dcp' },
  { menuId: 'MENU000376', menuIcon: 'stl' },
  { menuId: 'MENU000377', menuIcon: 'app' },
  { menuId: 'MENU000378', menuIcon: 'cmp' },
  { menuId: 'MENU000379', menuIcon: 'hlp' },
  { menuId: 'MENU000380', menuIcon: 'aff' },
  { menuId: 'MENU000472', menuIcon: 'dis' },
  { menuId: 'MENU000464', menuIcon: 'sub' }
]

export const TRCN_AGREE_TYPE_CD: { [index: string]: string } = {
  /** 동의 체크가 필요한 필수약관 */
  MANDATORY: '01',
  /** 필수고지사항이지만 동의체크가 필요 없는 필수약관 */
  OPTIONAL_MANDATORY: '02',
  /** 선택약관 */
  OPTIONAL: '03'
} as const

/** 영업장유형 코드 (고객센터) */
export const CS_BR_TYP_CD_LIST = ['310', '330', '700', '710']
/** 영업장유형 코드 (대리점) */
export const AG_BR_TYP_CD_LIST = ['500', '501', '530', '531', '540', '541']
