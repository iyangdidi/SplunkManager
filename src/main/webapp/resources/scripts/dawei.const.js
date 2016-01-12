/**
 * Const Javascript
 * @author jiahh
 * @date 20120424
 * Dawei.Const|
 */


//GlobalConst
var GlobalConst = {
    SystemTitle: "公共服务平台",
    TRS_DB_PADB: "pa_db",
    TREE_ADD: "添加",
    TREE_EDIT: "编辑",
    TREE_DELETE: "删除",
    URL_EPLEAGAL: "http://worldwide.espacenet.com/publicationDetails/inpadoc?CC={0}&NR={1}&KC={2}&FT=E",
    URL_DW_AbstImage: "http://books.daweisoft.com/books/GetAbstImage.aspx?docno={0}&pd={1}&kc={2}",
    EXAMPLE: "EXAMPLE"

};
var MessageConst = {
    Common_NoFlash: "未检测到Flash，请确认Flash是否正常安装。",
    EXAMPLE: "EXAMPLE"

};
var KeyWords = [">","<","!","文献号", "机关", "公开类型", "专利类型", "申请号", "申请年", "申请日", "优先权", "优先权国", "最早优先权年", "最早优先权日", "公开（公告）号", "公开年", "公开（公告）日", "批次号", "专利号", "分案原申请号", "名称", "名称中", "名称英", "名称德", "名称法", "分类号", "分类数", "IPC大类", "IPC小类", "IPC大组", "IPC小组", "主分类号", "主IPC大类", "主IPC小类", "主IPC大组", "主IPC小组", "IPC7版", "IPC版本", "IPC第8版", "申请（专利权）人", "申请人集合", "地址", "申请人数", "申请来源", "国省代码", "申请人国", "PADOC", "PAEPO", "PAORI", "主申请人", "主申请人国", "发明（设计）人", "发明人集合", "发明人地址", "发明人数", "发明人国", "INNEPO", "INNORI", "主发明人", "主发明人国", "摘要", "摘要中", "摘要英", "摘要法", "摘要德", "授权状态", "权利要求书", "权利要求书翻译", "主权项", "权项数", "说明书", "说明书翻译", "说明书附图", "页数", "权利要求书页数", "说明书页数", "说明书附图页数", "发布路径", "发布语言", "专利代理机构", "代理人", "审查员", "助理审查员", "颁证日", "相关申请", "引证专利", "引证专利数", "引证非专利", "引证非专利数", "相关案件", "参考文献", "国际申请", "国际申请日", "国际公布", "国际公开日", "进入国家日期", "欧洲分类号", "欧洲主分类号", "本国分类号", "本国主分类号", "本国分类数", "检索领域", "范畴分类", "法律状态", "最新法律状态", "最新法律状态公告日", "有效性", "指定国", "同族", "文件夹", "数据库", "全部", "DB001", "DB002", "DB003", "DB004", "DB005", "DB006", "DB007", "DB008", "DB009", "DB010", "DB011", "DB012", "DB013", "DB014", "DB015", "DB016", "DB017", "DB018", "DB019", "DB020", "DB021", "DB022", "DB023", "DB024", "DB025", "DB026", "DB027", "DB028", "DB029", "DB030", "DB031", "DB032", "DB033", "DB034", "DB035", "DB036", "DB037", "DB038", "DB039", "DB040", "DB041", "DB042", "DB043", "DB044", "DB045", "DB046", "DB047", "DB048", "DB049", "DB050", "DN", "CC", "KC", "PAT", "AN", "ADY", "AD", "PR", "PRCC", "EPRY", "EPRD", "PNM", "PDY", "PD", "BN", "PN", "DAN", "TI", "TICN", "TIEN", "TIDE", "TIFR", "SIC", "SICN", "IPCC", "IPCSC", "IPCG", "IPCSG", "PIC", "PICC", "PICSC", "PICG", "PICSG", "IPC7", "IPCV", "IPCR", "PA", "PATMS", "AR", "PAN", "APF", "CO", "PACC", "PPA", "PPACC", "INN", "INNTMS", "INNAR", "INNN", "INNCC", "PINN", "PINNCC", "ABST", "ABSTCN", "ABSTEN", "ABSTFR", "ABSTDE", "GRNT", "CLM", "CLMT", "CL", "CLMN", "DOC", "DESCRT", "DRWS", "DPN", "CLPN", "DEPN", "DRPN", "PP", "PL", "AGC", "AGT", "EXM", "AEXM", "LD", "RLTA", "REFP", "REFPN", "REFNP", "REFNPN", "CSTXT", "REFDOC", "IAN", "IAD", "IPN", "IPD", "DEN", "SEC", "PEC", "SNC", "PNC", "NCN", "SF", "CTGC", "LS", "LLS", "LLSD", "LV", "DST", "FML", "FLD", "DB", "AF", "WXH", "JG", "LX", "SQH", "SQRI", "YXQ", "GKH", "GKR", "ZLH", "FAYSQH", "MC", "MCCN", "MCEN", "MCDE", "MCFR", "FLH", "FLHS", "ZFLH", "IPC8", "SQRE", "DZ", "SQRS", "SQLY", "GSDM", "FMR", "FMRS", "FMRG", "ZFMR", "ZY", "ZYCN", "ZYEN", "ZYFR", "ZYDE", "SQZT", "QLYQS", "QLYQSFY", "ZQX", "QXS", "DESCR", "SMSFY", "YS", "YY", "ZLDLJG", "DLR", "SCY", "ZLSCY", "BZR", "XGSQ", "YZZL", "YZZLS", "YZFZL", "YZFZLS", "XGAJ", "GJSQ", "GJSQR", "GJGB", "GJGKR", "JRGJRQ", "OZFLH", "OZZFLH", "BGFLH", "BGZFLH", "BGFLS", "JSLY", "FCFL", "FLZT", "ZXFLZT", "ZXFLZTGGR", "YXX", "ZDG", "WJJ", "ADDR", "SMS"]