create table if not exists user_info
(
    id       bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    username text not null,
    email    text not null
);


CREATE VIEW public.vw_cbnd_lrgtn AS
SELECT
    c.id,
    c.geom AS geom,
    c.pnu AS pnu,
    c.jibun,
    c.bchk,
    c.sgg_oid,
    c.col_adm_se,
    l.adm_dist_code,
    l.land_site_code,
    l.lg_gbn,
    l.bo_jibn,
    l.bu_jibn,
    l.scale_code,
    l.jimk,
    l.area,
    l.land_move_why_code,
    l.land_move_ymd,
    l.bsin_enf_nt_gbn,
    l.ownsp_ch_cau_gbn,
    l.ownsp_ch_ymd,
    l.ownr_reg_no,
    l.own_gbn,
    l.shap_num,
    l.ownr_nm,
    l.ownr_addr,
    l.lg_cntrst_confrm_yn,
    l.org_cd,
    l.ownr_reg_sno
FROM public.cbnd c
JOIN public.lrgtn101 l ON c.pnu = l.pnu;



create VIEW public.vw_lrgtn101_jimk AS
SELECT
    l.*,
    g.cd_nm AS jimk_nm
FROM
    public.vw_cbnd_lrgtn l
LEFT JOIN
    public.gbn_cd_code g
ON
    l.jimk = g.cd;

create VIEW public.vw_lrgtn101_jiga AS
SELECT
    l.*,
    g.base_year || '-' || LPAD(g.base_month::TEXT, 2, '0') AS base_ym,
	g.jiga,
	g.jiga_ymd,
	g.std_yn
FROM
    public.vw_cbnd_lrgtn l
LEFT JOIN
    public.al_d151_46 g
ON
    l.pnu = g.pnu;
