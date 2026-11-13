import { 
  AdminUser, 
  AdminCoupon, 
  AdminTransaction, 
  GlobalAnnouncement, 
  AuditLog, 
  AiPromptConfig, 
  PricingTierConfig,
  MCQQuestion,
  Paper1Unit,
  LiteratureUnit,
  MpesbGrade1Unit,
  MpesbGrade2Unit
} from '../types';
import { 
  INITIAL_ADMIN_USERS, 
  INITIAL_ADMIN_COUPONS, 
  INITIAL_ADMIN_TRANSACTIONS, 
  INITIAL_GLOBAL_ANNOUNCEMENT, 
  INITIAL_AUDIT_LOGS, 
  INITIAL_AI_CONFIG, 
  INITIAL_PRICING_CONFIG 
} from '../data/adminMockData';
import { MCQS_AND_PYQS } from '../data/mcqsAndPyqs';
import { NET_PAPER1_UNITS } from '../data/netPaper1Syllabus';
import { UNIFIED_NET_MPSET_PAPER2_UNITS } from '../data/literatureSyllabus';
import { MPESB_GRADE1_UNITS } from '../data/mpesbGrade1Syllabus';
import { MPESB_GRADE2_UNITS } from '../data/mpesbGrade2Syllabus';

// Storage keys
const KEYS = {
  USERS: 'crafty_admin_users_v2',
  COUPONS: 'crafty_admin_coupons_v1',
  TRANSACTIONS: 'crafty_admin_transactions_v1',
  GLOBAL_BANNER: 'crafty_admin_banner_v1',
  AUDIT_LOGS: 'crafty_admin_audit_logs_v1',
  AI_CONFIG: 'crafty_admin_ai_config_v1',
  PRICING: 'crafty_admin_pricing_v2',
  CUSTOM_MCQS: 'crafty_admin_custom_mcqs_v1',
  DELETED_MCQ_IDS: 'crafty_admin_deleted_mcq_ids_v1',
  ADMIN_AUTH: 'crafty_admin_auth_v1',
  CUSTOM_P1_SYLLABUS: 'crafty_admin_p1_syllabus_v1',
  CUSTOM_P2_SYLLABUS: 'crafty_admin_p2_syllabus_v1',
  CUSTOM_G1_SYLLABUS: 'crafty_admin_g1_syllabus_v1',
  CUSTOM_G2_SYLLABUS: 'crafty_admin_g2_syllabus_v1',
};

const notifyUpdate = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('crafty_storage_update'));
  }
};

const safeGet = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const safeSet = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    notifyUpdate();
  } catch (err) {
    console.warn(`Failed to set localStorage key: ${key}`, err);
  }
};

export const adminStorage = {
  // Authentication
  getAdminAuth: (): { isAuthenticated: boolean; role: string; email: string } => {
    return safeGet(KEYS.ADMIN_AUTH, {
      isAuthenticated: false,
      role: 'Super Admin',
      email: 'chaink2000@gmail.com',
    });
  },

  setAdminAuth: (auth: { isAuthenticated: boolean; role: string; email: string }) => {
    safeSet(KEYS.ADMIN_AUTH, auth);
  },

  logoutAdmin: () => {
    safeSet(KEYS.ADMIN_AUTH, {
      isAuthenticated: false,
      role: 'Super Admin',
      email: 'chaink2000@gmail.com',
    });
  },

  // Users
  getUsers: (): AdminUser[] => {
    return safeGet<AdminUser[]>(KEYS.USERS, INITIAL_ADMIN_USERS);
  },

  saveUser: (user: AdminUser) => {
    const users = adminStorage.getUsers();
    const idx = users.findIndex((u) => u.id === user.id);
    let updated: AdminUser[];
    if (idx >= 0) {
      updated = [...users];
      updated[idx] = user;
    } else {
      updated = [user, ...users];
    }
    safeSet(KEYS.USERS, updated);
    adminStorage.addAuditLog({
      action: idx >= 0 ? `Updated User: ${user.name}` : `Created User: ${user.name}`,
      category: 'User RBAC',
      details: `Role: ${user.role}, Status: ${user.status}, Email: ${user.email}`,
    });
    return updated;
  },

  deleteUser: (id: string) => {
    const users = adminStorage.getUsers();
    const toDelete = users.find((u) => u.id === id);
    const updated = users.filter((u) => u.id !== id);
    safeSet(KEYS.USERS, updated);
    if (toDelete) {
      adminStorage.addAuditLog({
        action: `Deleted User: ${toDelete.name}`,
        category: 'User RBAC',
        details: `Removed user ID ${id} (${toDelete.email})`,
      });
    }
    return updated;
  },

  // Coupons
  getCoupons: (): AdminCoupon[] => {
    return safeGet<AdminCoupon[]>(KEYS.COUPONS, INITIAL_ADMIN_COUPONS);
  },

  saveCoupon: (coupon: AdminCoupon) => {
    const coupons = adminStorage.getCoupons();
    const idx = coupons.findIndex((c) => c.id === coupon.id || c.code.toUpperCase() === coupon.code.toUpperCase());
    let updated: AdminCoupon[];
    if (idx >= 0) {
      updated = [...coupons];
      updated[idx] = coupon;
    } else {
      updated = [coupon, ...coupons];
    }
    safeSet(KEYS.COUPONS, updated);
    adminStorage.addAuditLog({
      action: idx >= 0 ? `Updated Promo Code: ${coupon.code}` : `Created Promo Code: ${coupon.code}`,
      category: 'Coupons',
      details: `Discount: ${coupon.discountPercent}%, Max Uses: ${coupon.maxUses}, Expiry: ${coupon.expiryDate}`,
    });
    return updated;
  },

  deleteCoupon: (id: string) => {
    const coupons = adminStorage.getCoupons();
    const toDelete = coupons.find((c) => c.id === id);
    const updated = coupons.filter((c) => c.id !== id);
    safeSet(KEYS.COUPONS, updated);
    if (toDelete) {
      adminStorage.addAuditLog({
        action: `Deleted Promo Code: ${toDelete.code}`,
        category: 'Coupons',
        details: `Deleted promo discount code ${toDelete.code}`,
      });
    }
    return updated;
  },

  validateCoupon: (code: string): { valid: boolean; discountPercent: number; coupon?: AdminCoupon; message?: string } => {
    const cleanCode = code.trim().toUpperCase();
    const coupons = adminStorage.getCoupons();
    const found = coupons.find((c) => c.code.toUpperCase() === cleanCode);

    if (!found) {
      return { valid: false, discountPercent: 0, message: 'Invalid promo code.' };
    }

    if (found.status === 'disabled') {
      return { valid: false, discountPercent: 0, message: 'This coupon is currently inactive.' };
    }

    if (found.status === 'expired' || new Date(found.expiryDate) < new Date()) {
      return { valid: false, discountPercent: 0, message: 'This promo code has expired.' };
    }

    if (found.usedCount >= found.maxUses) {
      return { valid: false, discountPercent: 0, message: 'Coupon usage limit has been reached.' };
    }

    return {
      valid: true,
      discountPercent: found.discountPercent,
      coupon: found,
      message: `Success! ${found.discountPercent}% discount applied (${found.code}).`,
    };
  },

  incrementCouponUsage: (code: string) => {
    const coupons = adminStorage.getCoupons();
    const clean = code.trim().toUpperCase();
    const updated = coupons.map((c) => {
      if (c.code.toUpperCase() === clean) {
        return { ...c, usedCount: c.usedCount + 1 };
      }
      return c;
    });
    safeSet(KEYS.COUPONS, updated);
  },

  // Transactions
  getTransactions: (): AdminTransaction[] => {
    return safeGet<AdminTransaction[]>(KEYS.TRANSACTIONS, INITIAL_ADMIN_TRANSACTIONS);
  },

  recordTransaction: (tx: AdminTransaction) => {
    const txs = adminStorage.getTransactions();
    const updated = [tx, ...txs];
    safeSet(KEYS.TRANSACTIONS, updated);
    adminStorage.addAuditLog({
      action: `New Transaction Recorded: ${tx.invoiceId}`,
      category: 'Financials',
      details: `${tx.customerName} purchased ${tx.plan} (${tx.currency} ${tx.amount})`,
    });
    return updated;
  },

  refundTransaction: (id: string) => {
    const txs = adminStorage.getTransactions();
    const updated = txs.map((t) => (t.id === id ? { ...t, status: 'refunded' as const } : t));
    safeSet(KEYS.TRANSACTIONS, updated);
    const target = txs.find((t) => t.id === id);
    if (target) {
      adminStorage.addAuditLog({
        action: `Transaction Refunded: ${target.invoiceId}`,
        category: 'Financials',
        details: `Issued full refund of ${target.currency} ${target.amount} for ${target.customerEmail}`,
      });
    }
    return updated;
  },

  // Global Announcement Banner
  getGlobalAnnouncement: (): GlobalAnnouncement => {
    return safeGet<GlobalAnnouncement>(KEYS.GLOBAL_BANNER, INITIAL_GLOBAL_ANNOUNCEMENT);
  },

  setGlobalAnnouncement: (announcement: GlobalAnnouncement) => {
    safeSet(KEYS.GLOBAL_BANNER, announcement);
    adminStorage.addAuditLog({
      action: announcement.isLive ? 'Published Global Announcement' : 'Disabled Global Announcement',
      category: 'System',
      details: `Banner Text: "${announcement.text.slice(0, 60)}..." (Status: ${announcement.isLive ? 'Active' : 'Hidden'})`,
    });
  },

  // Audit Logs
  getAuditLogs: (): AuditLog[] => {
    return safeGet<AuditLog[]>(KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
  },

  addAuditLog: (entry: { action: string; category: AuditLog['category']; details: string; adminUser?: string }) => {
    const current = adminStorage.getAuditLogs();
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      adminUser: entry.adminUser || 'Vikramaditya Rao (Super Admin)',
      action: entry.action,
      category: entry.category,
      details: entry.details,
    };
    safeSet(KEYS.AUDIT_LOGS, [newLog, ...current].slice(0, 100)); // Keep last 100
  },

  // AI Prompt & Model Config
  getAiConfig: (): AiPromptConfig => {
    return safeGet<AiPromptConfig>(KEYS.AI_CONFIG, INITIAL_AI_CONFIG);
  },

  setAiConfig: (config: AiPromptConfig) => {
    safeSet(KEYS.AI_CONFIG, config);
    adminStorage.addAuditLog({
      action: 'Updated AI Studio Configuration',
      category: 'AI Prompt',
      details: `Model: ${config.selectedModel}, Temp: ${config.temperature}, Max Tokens: ${config.maxOutputTokens}, Safety: ${config.safetyLevel}`,
    });
  },

  // Pricing Config
  getPricingConfig: (): PricingTierConfig => {
    return safeGet<PricingTierConfig>(KEYS.PRICING, INITIAL_PRICING_CONFIG);
  },

  setPricingConfig: (config: PricingTierConfig) => {
    safeSet(KEYS.PRICING, config);
    adminStorage.addAuditLog({
      action: 'Updated Subscription Pricing',
      category: 'Financials',
      details: `Scholar Monthly: $${config.scholarMonthlyUsd} / ₹${config.scholarMonthlyInr}, Inst: $${config.institutionMonthlyUsd} / ₹${config.institutionMonthlyInr}`,
    });
  },

  // Questions CMS Sync (Combines Default MCQs with Custom ones)
  getAllMCQs: (): MCQQuestion[] => {
    const deletedIds = new Set(safeGet<string[]>(KEYS.DELETED_MCQ_IDS, []));
    const customMcqs = safeGet<MCQQuestion[]>(KEYS.CUSTOM_MCQS, []);
    
    // Default MCQs excluding deleted ones and custom overrides
    const customMap = new Map(customMcqs.map((q) => [q.id, q]));
    const baseFiltered = MCQS_AND_PYQS
      .filter((q) => !deletedIds.has(q.id))
      .map((q) => customMap.get(q.id) || q);

    // Any new custom MCQs not present in base
    const baseIds = new Set(MCQS_AND_PYQS.map((q) => q.id));
    const strictlyNew = customMcqs.filter((q) => !baseIds.has(q.id) && !deletedIds.has(q.id));

    return [...strictlyNew, ...baseFiltered];
  },

  saveMCQ: (mcq: MCQQuestion) => {
    const customMcqs = safeGet<MCQQuestion[]>(KEYS.CUSTOM_MCQS, []);
    const idx = customMcqs.findIndex((q) => q.id === mcq.id);
    let updated: MCQQuestion[];
    if (idx >= 0) {
      updated = [...customMcqs];
      updated[idx] = mcq;
    } else {
      updated = [mcq, ...customMcqs];
    }
    safeSet(KEYS.CUSTOM_MCQS, updated);

    // If it was previously marked deleted, unmark it
    const deleted = safeGet<string[]>(KEYS.DELETED_MCQ_IDS, []);
    if (deleted.includes(mcq.id)) {
      safeSet(KEYS.DELETED_MCQ_IDS, deleted.filter((id) => id !== mcq.id));
    }

    adminStorage.addAuditLog({
      action: idx >= 0 ? `Updated Question: ${mcq.id}` : `Added New Question: ${mcq.id}`,
      category: 'Questions',
      details: `Exam: ${mcq.exam}, Topic: ${mcq.topic}, Year: ${mcq.year || 'N/A'}, Question: "${mcq.question.slice(0, 50)}..."`,
    });

    return adminStorage.getAllMCQs();
  },

  deleteMCQ: (id: string) => {
    const deleted = safeGet<string[]>(KEYS.DELETED_MCQ_IDS, []);
    if (!deleted.includes(id)) {
      safeSet(KEYS.DELETED_MCQ_IDS, [...deleted, id]);
    }
    const custom = safeGet<MCQQuestion[]>(KEYS.CUSTOM_MCQS, []);
    safeSet(KEYS.CUSTOM_MCQS, custom.filter((q) => q.id !== id));

    adminStorage.addAuditLog({
      action: `Deleted Question: ${id}`,
      category: 'Questions',
      details: `Question ID ${id} was purged from the active question bank.`,
    });

    return adminStorage.getAllMCQs();
  },

  // Syllabus CMS Sync
  getPaper1Syllabus: (): Paper1Unit[] => {
    return safeGet<Paper1Unit[]>(KEYS.CUSTOM_P1_SYLLABUS, NET_PAPER1_UNITS);
  },
  savePaper1Syllabus: (units: Paper1Unit[]) => {
    safeSet(KEYS.CUSTOM_P1_SYLLABUS, units);
    adminStorage.addAuditLog({
      action: 'Updated Paper 1 Syllabus',
      category: 'Syllabus',
      details: `Saved ${units.length} units for NTA NET Paper 1.`,
    });
  },

  getLiteratureSyllabus: (): LiteratureUnit[] => {
    return safeGet<LiteratureUnit[]>(KEYS.CUSTOM_P2_SYLLABUS, UNIFIED_NET_MPSET_PAPER2_UNITS);
  },
  saveLiteratureSyllabus: (units: LiteratureUnit[]) => {
    safeSet(KEYS.CUSTOM_P2_SYLLABUS, units);
    adminStorage.addAuditLog({
      action: 'Updated Literature Syllabus',
      category: 'Syllabus',
      details: `Saved ${units.length} units for NTA NET & MPSET Literature.`,
    });
  },

  getMpesbGrade1Syllabus: (): MpesbGrade1Unit[] => {
    return safeGet<MpesbGrade1Unit[]>(KEYS.CUSTOM_G1_SYLLABUS, MPESB_GRADE1_UNITS);
  },
  saveMpesbGrade1Syllabus: (units: MpesbGrade1Unit[]) => {
    safeSet(KEYS.CUSTOM_G1_SYLLABUS, units);
    adminStorage.addAuditLog({
      action: 'Updated MPESB Grade 1 Syllabus',
      category: 'Syllabus',
      details: `Saved ${units.length} sections for High School Teacher.`,
    });
  },

  getMpesbGrade2Syllabus: (): MpesbGrade2Unit[] => {
    return safeGet<MpesbGrade2Unit[]>(KEYS.CUSTOM_G2_SYLLABUS, MPESB_GRADE2_UNITS);
  },
  saveMpesbGrade2Syllabus: (units: MpesbGrade2Unit[]) => {
    safeSet(KEYS.CUSTOM_G2_SYLLABUS, units);
    adminStorage.addAuditLog({
      action: 'Updated MPESB Grade 2 Syllabus',
      category: 'Syllabus',
      details: `Saved ${units.length} sections for Middle School Teacher & TET Pedagogy.`,
    });
  },

  // Full backup & restore
  exportFullBackup: (): string => {
    const backup = {
      timestamp: new Date().toISOString(),
      users: adminStorage.getUsers(),
      coupons: adminStorage.getCoupons(),
      transactions: adminStorage.getTransactions(),
      globalBanner: adminStorage.getGlobalAnnouncement(),
      auditLogs: adminStorage.getAuditLogs(),
      aiConfig: adminStorage.getAiConfig(),
      pricingConfig: adminStorage.getPricingConfig(),
      customMcqs: safeGet(KEYS.CUSTOM_MCQS, []),
      deletedMcqIds: safeGet(KEYS.DELETED_MCQ_IDS, []),
      p1Syllabus: adminStorage.getPaper1Syllabus(),
      p2Syllabus: adminStorage.getLiteratureSyllabus(),
      g1Syllabus: adminStorage.getMpesbGrade1Syllabus(),
      g2Syllabus: adminStorage.getMpesbGrade2Syllabus(),
    };
    return JSON.stringify(backup, null, 2);
  },

  importFullBackup: (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.users) safeSet(KEYS.USERS, data.users);
      if (data.coupons) safeSet(KEYS.COUPONS, data.coupons);
      if (data.transactions) safeSet(KEYS.TRANSACTIONS, data.transactions);
      if (data.globalBanner) safeSet(KEYS.GLOBAL_BANNER, data.globalBanner);
      if (data.auditLogs) safeSet(KEYS.AUDIT_LOGS, data.auditLogs);
      if (data.aiConfig) safeSet(KEYS.AI_CONFIG, data.aiConfig);
      if (data.pricingConfig) safeSet(KEYS.PRICING, data.pricingConfig);
      if (data.customMcqs) safeSet(KEYS.CUSTOM_MCQS, data.customMcqs);
      if (data.deletedMcqIds) safeSet(KEYS.DELETED_MCQ_IDS, data.deletedMcqIds);
      if (data.p1Syllabus) safeSet(KEYS.CUSTOM_P1_SYLLABUS, data.p1Syllabus);
      if (data.p2Syllabus) safeSet(KEYS.CUSTOM_P2_SYLLABUS, data.p2Syllabus);
      if (data.g1Syllabus) safeSet(KEYS.CUSTOM_G1_SYLLABUS, data.g1Syllabus);
      if (data.g2Syllabus) safeSet(KEYS.CUSTOM_G2_SYLLABUS, data.g2Syllabus);

      adminStorage.addAuditLog({
        action: 'System Database Restored',
        category: 'System',
        details: 'Imported complete CMS state from JSON backup archive.',
      });
      return true;
    } catch (err) {
      console.error('Failed to import backup:', err);
      return false;
    }
  },

  resetToDefaults: () => {
    Object.values(KEYS).forEach((k) => {
      try {
        localStorage.removeItem(k);
      } catch {}
    });
    notifyUpdate();
  },
};
